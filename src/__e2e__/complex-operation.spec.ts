import { Forgefy } from "..";

describe("E2E Complex Operator Interoperability", () => {
  describe("Scenario 1: E-commerce Order Processing", () => {
    it("should process complex order with pricing, discounts, and validation", () => {
      const orderData = {
        order: {
          id: "ORD-2025-001",
          customer: {
            name: "  John Doe  ",
            email: "JOHN.DOE@EXAMPLE.COM",
            vipLevel: 3,
            loyaltyPoints: 1250,
          },
          items: [
            { price: 99.99, quantity: 2, taxRate: 0.08 },
            { price: 49.5, quantity: 1, taxRate: 0.08 },
            { price: 150.0, quantity: 1, taxRate: 0.08 },
          ],
          couponCode: "SAVE20",
          shippingCost: 15.99,
          orderDate: "2025-01-15T10:30:00Z",
          deliveryDate: "2025-01-20T10:30:00Z",
        },
      };

      const blueprint = {
        orderId: "$order.id",
        customer: {
          name: { $trim: { input: "$order.customer.name" } },
          email: { $toLower: "$order.customer.email" },
          isVIP: { $gte: ["$order.customer.vipLevel", 3] },
          tier: {
            $switch: {
              branches: [
                {
                  case: { $gte: ["$order.customer.vipLevel", 5] },
                  then: "PLATINUM",
                },
                {
                  case: { $gte: ["$order.customer.vipLevel", 3] },
                  then: "GOLD",
                },
                {
                  case: { $gte: ["$order.customer.vipLevel", 1] },
                  then: "SILVER",
                },
              ],
              default: "BRONZE",
            },
          },
          canRedeemPoints: {
            $and: [
              { $gte: ["$order.customer.loyaltyPoints", 1000] },
              { $gte: ["$order.customer.vipLevel", 2] },
            ],
          },
        },
        pricing: {
          subtotal: {
            $round: {
              value: {
                $add: [
                  { $multiply: [99.99, 2] },
                  { $multiply: [49.5, 1] },
                  { $multiply: [150.0, 1] },
                ],
              },
              precision: 2,
            },
          },
          itemCount: { $size: "$order.items" },
          averageItemPrice: {
            $round: {
              value: {
                $divide: [
                  {
                    $add: [
                      { $multiply: [99.99, 2] },
                      { $multiply: [49.5, 1] },
                      { $multiply: [150.0, 1] },
                    ],
                  },
                  { $size: "$order.items" },
                ],
              },
              precision: 2,
            },
          },
          hasDiscount: {
            $and: [
              { $ne: ["$order.couponCode", null] },
              { $ne: ["$order.couponCode", ""] },
            ],
          },
          discountAmount: {
            $cond: {
              if: { $eq: ["$order.couponCode", "SAVE20"] },
              then: {
                $round: {
                  value: {
                    $multiply: [
                      {
                        $add: [
                          { $multiply: [99.99, 2] },
                          { $multiply: [49.5, 1] },
                          { $multiply: [150.0, 1] },
                        ],
                      },
                      0.2,
                    ],
                  },
                  precision: 2,
                },
              },
              else: 0,
            },
          },
          taxAmount: {
            $round: {
              value: {
                $multiply: [
                  {
                    $subtract: [
                      {
                        $add: [
                          { $multiply: [99.99, 2] },
                          { $multiply: [49.5, 1] },
                          { $multiply: [150.0, 1] },
                        ],
                      },
                      {
                        $multiply: [
                          {
                            $add: [
                              { $multiply: [99.99, 2] },
                              { $multiply: [49.5, 1] },
                              { $multiply: [150.0, 1] },
                            ],
                          },
                          0.2,
                        ],
                      },
                    ],
                  },
                  0.08,
                ],
              },
              precision: 2,
            },
          },
          shipping: "$order.shippingCost",
          total: {
            $round: {
              value: {
                $add: [
                  {
                    $subtract: [
                      {
                        $add: [
                          { $multiply: [99.99, 2] },
                          { $multiply: [49.5, 1] },
                          { $multiply: [150.0, 1] },
                        ],
                      },
                      {
                        $multiply: [
                          {
                            $add: [
                              { $multiply: [99.99, 2] },
                              { $multiply: [49.5, 1] },
                              { $multiply: [150.0, 1] },
                            ],
                          },
                          0.2,
                        ],
                      },
                    ],
                  },
                  {
                    $multiply: [
                      {
                        $subtract: [
                          {
                            $add: [
                              { $multiply: [99.99, 2] },
                              { $multiply: [49.5, 1] },
                              { $multiply: [150.0, 1] },
                            ],
                          },
                          {
                            $multiply: [
                              {
                                $add: [
                                  { $multiply: [99.99, 2] },
                                  { $multiply: [49.5, 1] },
                                  { $multiply: [150.0, 1] },
                                ],
                              },
                              0.2,
                            ],
                          },
                        ],
                      },
                      0.08,
                    ],
                  },
                  15.99,
                ],
              },
              precision: 2,
            },
          },
        },
        delivery: {
          estimatedDays: {
            $dateDiff: {
              startDate: "$order.orderDate",
              endDate: "$order.deliveryDate",
              unit: "days",
            },
          },
          isFastShipping: {
            $lte: [
              {
                $dateDiff: {
                  startDate: "$order.orderDate",
                  endDate: "$order.deliveryDate",
                  unit: "days",
                },
              },
              7,
            ],
          },
        },
        qualityChecks: {
          hasValidEmail: {
            $regex: {
              value: { $toLower: "$order.customer.email" },
              pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
            },
          },
          allItemsValid: {
            $every: {
              conditions: [
                { $gt: [99.99, 0] },
                { $gt: [49.5, 0] },
                { $gt: [150.0, 0] },
              ],
              then: true,
              else: false,
            },
          },
          hasAnyExpensiveItem: {
            $some: {
              conditions: [
                { $gte: [99.99, 100] },
                { $gte: [49.5, 100] },
                { $gte: [150.0, 100] },
              ],
              then: true,
              else: false,
            },
          },
        },
      };

      const result = Forgefy.this(orderData, blueprint);

      expect(result).toEqual({
        orderId: "ORD-2025-001",
        customer: {
          name: "John Doe",
          email: "john.doe@example.com",
          isVIP: true,
          tier: "GOLD",
          canRedeemPoints: true,
        },
        pricing: {
          subtotal: 399.48,
          itemCount: 3,
          averageItemPrice: 133.16,
          hasDiscount: true,
          discountAmount: 79.9,
          taxAmount: 25.57,
          shipping: 15.99,
          total: 361.14,
        },
        delivery: {
          estimatedDays: 5,
          isFastShipping: true,
        },
        qualityChecks: {
          hasValidEmail: true,
          allItemsValid: true,
          hasAnyExpensiveItem: true,
        },
      });
    });
  });

  describe("Scenario 2: User Profile Data Sanitization", () => {
    it("should sanitize and validate user profile with complex string operations", () => {
      const userData = {
        profile: {
          username: "  User_123!@#  ",
          bio: "Hello World! This is my bio.",
          phone: "(555) 123-4567",
          ssn: "123-45-6789",
          website: "HTTPS://EXAMPLE.COM/USER",
          tags: ["developer", "designer", "writer", "photographer", "musician"],
          score: 87.6543,
          age: 25,
          balance: -150.75,
          metadata: {
            verified: true,
            premium: false,
            loginCount: 42,
          },
        },
      };

      const blueprint = {
        username: {
          $toLower: {
            $replace: {
              input: {
                $trim: {
                  input: "$profile.username",
                },
              },
              searchValues: ["!", "@", "#", "$", "%"],
              replacement: "",
            },
          },
        },
        bioLength: {
          $size: { $split: { input: "$profile.bio", delimiter: " " } },
        },
        bioPreview: {
          $concat: [
            { $slice: { input: "$profile.bio", start: 0, end: 20 } },
            "...",
          ],
        },
        contact: {
          phoneDigits: {
            $replace: {
              input: "$profile.phone",
              searchValues: ["(", ")", " ", "-"],
              replacement: "",
            },
          },
          ssnMasked: {
            $concat: [
              "***-**-",
              { $substr: { value: "$profile.ssn", start: 7, length: 4 } },
            ],
          },
          websiteLower: { $toLower: "$profile.website" },
        },
        stats: {
          tagCount: { $size: "$profile.tags" },
          maxTags: { $max: [1, 2, 3, 4, 5] },
          minTags: { $min: [1, 2, 3, 4, 5] },
          scoreRounded: { $round: { value: "$profile.score", precision: 1 } },
          scoreCeiled: { $ceil: "$profile.score" },
          scoreFloored: { $floor: "$profile.score" },
          scoreFixed: { $toFixed: { value: "$profile.score", precision: 2 } },
          ageString: { $toString: "$profile.age" },
          balanceAbs: { $abs: "$profile.balance" },
          isNegativeBalance: { $lt: ["$profile.balance", 0] },
        },
        validation: {
          isVerified: "$profile.metadata.verified",
          isPremium: "$profile.metadata.premium",
          hasLogins: { $gt: ["$profile.metadata.loginCount", 0] },
          isActive: {
            $or: [
              "$profile.metadata.verified",
              { $gt: ["$profile.metadata.loginCount", 10] },
            ],
          },
          needsAttention: {
            $and: [
              { $not: "$profile.metadata.premium" },
              { $lt: ["$profile.balance", 0] },
            ],
          },
          statusCode: {
            $cond: {
              if: "$profile.metadata.verified",
              then: {
                $cond: {
                  if: "$profile.metadata.premium",
                  then: "VERIFIED_PREMIUM",
                  else: "VERIFIED_FREE",
                },
              },
              else: "UNVERIFIED",
            },
          },
        },
        checks: {
          balanceIsNumber: { $isNumber: "$profile.balance" },
          balanceNotNull: { $not: { $isNull: "$profile.balance" } },
          ageExists: { $exists: "profile.age" },
          missingFieldExists: { $exists: "profile.nonexistent" },
          scoreNotNaN: { $not: { $isNaN: "$profile.score" } },
          firstNonNull: {
            $coalesce: [
              "$profile.missing1",
              "$profile.missing2",
              "$profile.username",
              "fallback",
            ],
          },
        },
      };

      const result = Forgefy.this(userData, blueprint);

      expect(result).toEqual({
        username: "user_123",
        bioLength: 6,
        bioPreview: "Hello World! This is...",
        contact: {
          phoneDigits: "5551234567",
          ssnMasked: "***-**-6789",
          websiteLower: "https://example.com/user",
        },
        stats: {
          tagCount: 5,
          maxTags: 5,
          minTags: 1,
          scoreRounded: 87.7,
          scoreCeiled: 88,
          scoreFloored: 87,
          scoreFixed: 87.65,
          ageString: "25",
          balanceAbs: 150.75,
          isNegativeBalance: true,
        },
        validation: {
          isVerified: true,
          isPremium: false,
          hasLogins: true,
          isActive: true,
          needsAttention: true,
          statusCode: "VERIFIED_FREE",
        },
        checks: {
          balanceIsNumber: true,
          balanceNotNull: true,
          ageExists: true,
          missingFieldExists: false,
          scoreNotNaN: true,
          firstNonNull: "  User_123!@#  ",
        },
      });
    });
  });

  describe("Scenario 3: Financial Report with Complex Calculations", () => {
    it("should generate financial report with nested calculations and conditionals", () => {
      const financialData = {
        company: {
          name: "TechCorp Inc.",
          revenue: 1000000,
          expenses: 750000,
          employees: 50,
          quarters: [
            { q: 1, revenue: 200000, expenses: 180000 },
            { q: 2, revenue: 250000, expenses: 190000 },
            { q: 3, revenue: 275000, expenses: 195000 },
            { q: 4, revenue: 275000, expenses: 185000 },
          ],
          taxRate: 0.21,
          previousYearProfit: 180000,
        },
      };

      const blueprint = {
        companyName: "$company.name",
        financials: {
          revenue: "$company.revenue",
          expenses: "$company.expenses",
          profit: { $subtract: ["$company.revenue", "$company.expenses"] },
          profitMargin: {
            $round: {
              value: {
                $multiply: [
                  {
                    $divide: [
                      { $subtract: ["$company.revenue", "$company.expenses"] },
                      "$company.revenue",
                    ],
                  },
                  100,
                ],
              },
              precision: 2,
            },
          },
          taxAmount: {
            $round: {
              value: {
                $multiply: [
                  { $subtract: ["$company.revenue", "$company.expenses"] },
                  "$company.taxRate",
                ],
              },
              precision: 2,
            },
          },
          netProfit: {
            $round: {
              value: {
                $subtract: [
                  { $subtract: ["$company.revenue", "$company.expenses"] },
                  {
                    $multiply: [
                      { $subtract: ["$company.revenue", "$company.expenses"] },
                      "$company.taxRate",
                    ],
                  },
                ],
              },
              precision: 2,
            },
          },
          revenuePerEmployee: {
            $round: {
              value: { $divide: ["$company.revenue", "$company.employees"] },
              precision: 2,
            },
          },
        },
        performance: {
          isProfitable: {
            $gt: [{ $subtract: ["$company.revenue", "$company.expenses"] }, 0],
          },
          profitGrowth: {
            $round: {
              value: {
                $multiply: [
                  {
                    $divide: [
                      {
                        $subtract: [
                          {
                            $subtract: [
                              "$company.revenue",
                              "$company.expenses",
                            ],
                          },
                          "$company.previousYearProfit",
                        ],
                      },
                      "$company.previousYearProfit",
                    ],
                  },
                  100,
                ],
              },
              precision: 2,
            },
          },
          performanceRating: {
            $switch: {
              branches: [
                {
                  case: {
                    $gte: [
                      {
                        $multiply: [
                          {
                            $divide: [
                              {
                                $subtract: [
                                  "$company.revenue",
                                  "$company.expenses",
                                ],
                              },
                              "$company.revenue",
                            ],
                          },
                          100,
                        ],
                      },
                      30,
                    ],
                  },
                  then: "EXCELLENT",
                },
                {
                  case: {
                    $gte: [
                      {
                        $multiply: [
                          {
                            $divide: [
                              {
                                $subtract: [
                                  "$company.revenue",
                                  "$company.expenses",
                                ],
                              },
                              "$company.revenue",
                            ],
                          },
                          100,
                        ],
                      },
                      20,
                    ],
                  },
                  then: "GOOD",
                },
                {
                  case: {
                    $gte: [
                      {
                        $multiply: [
                          {
                            $divide: [
                              {
                                $subtract: [
                                  "$company.revenue",
                                  "$company.expenses",
                                ],
                              },
                              "$company.revenue",
                            ],
                          },
                          100,
                        ],
                      },
                      10,
                    ],
                  },
                  then: "FAIR",
                },
              ],
              default: "POOR",
            },
          },
          meetsTargets: {
            $every: {
              conditions: [
                {
                  $gte: [
                    {
                      $multiply: [
                        {
                          $divide: [
                            {
                              $subtract: [
                                "$company.revenue",
                                "$company.expenses",
                              ],
                            },
                            "$company.revenue",
                          ],
                        },
                        100,
                      ],
                    },
                    15,
                  ],
                },
                { $gte: ["$company.revenue", 500000] },
                { $lte: ["$company.expenses", 800000] },
              ],
              then: true,
              else: false,
            },
          },
          hasAnyRedFlag: {
            $some: {
              conditions: [
                { $lt: ["$company.revenue", 500000] },
                { $gt: ["$company.expenses", 900000] },
                {
                  $lt: [
                    {
                      $multiply: [
                        {
                          $divide: [
                            {
                              $subtract: [
                                "$company.revenue",
                                "$company.expenses",
                              ],
                            },
                            "$company.revenue",
                          ],
                        },
                        100,
                      ],
                    },
                    5,
                  ],
                },
              ],
              then: true,
              else: false,
            },
          },
        },
        quarterlyAnalysis: {
          totalQuarters: { $size: "$company.quarters" },
          bestQuarterRevenue: { $max: [200000, 250000, 275000, 275000] },
          worstQuarterRevenue: { $min: [200000, 250000, 275000, 275000] },
          avgQuarterlyRevenue: {
            $round: {
              value: {
                $divide: [
                  { $add: [200000, 250000, 275000, 275000] },
                  { $size: "$company.quarters" },
                ],
              },
              precision: 2,
            },
          },
        },
      };

      const result = Forgefy.this(financialData, blueprint);

      expect(result).toEqual({
        companyName: "TechCorp Inc.",
        financials: {
          revenue: 1000000,
          expenses: 750000,
          profit: 250000,
          profitMargin: 25,
          taxAmount: 52500,
          netProfit: 197500,
          revenuePerEmployee: 20000,
        },
        performance: {
          isProfitable: true,
          profitGrowth: 38.89,
          performanceRating: "GOOD",
          meetsTargets: true,
          hasAnyRedFlag: false,
        },
        quarterlyAnalysis: {
          totalQuarters: 4,
          bestQuarterRevenue: 275000,
          worstQuarterRevenue: 200000,
          avgQuarterlyRevenue: 250000,
        },
      });
    });
  });

  describe("Scenario 4: Text Processing with RegexReplace", () => {
    it("should sanitize and normalize text using regex patterns with operator interoperability", () => {
      const textData = {
        content: {
          userInput: "  Hello      World!   How   are    you?  ",
          phoneNumber: "(555) 123-4567",
          document: "123.456.789-10",
          email: "  USER@EXAMPLE.COM  ",
          description: "Product123 is GREAT!!!   Buy456 now!!!",
          htmlContent: "<p>Hello <strong>World</strong></p>",
          url: "https://example.com/path?query=value",
          messyText: "too...many....dots and!!!exclamation!!marks!",
          code: "variable_name_123",
        },
        metadata: {
          priority: 3,
          status: "active",
        },
      };

      const blueprint = {
        // Whitespace normalization with trim
        normalizedInput: {
          $trim: {
            input: {
              $regexReplace: {
                input: "$content.userInput",
                pattern: "\\s+",
                replacement: " ",
              },
            },
          },
        },
        // Phone number sanitization
        cleanPhone: {
          $regexReplace: {
            input: "$content.phoneNumber",
            pattern: "[\\s\\(\\)\\-]",
            replacement: "",
          },
        },
        // Document cleaning (CPF)
        cleanDocument: {
          $regexReplace: {
            input: "$content.document",
            pattern: "[.\\-]",
            replacement: "",
          },
        },
        // Email processing with multiple operators
        processedEmail: {
          $toLower: {
            $trim: {
              input: {
                $regexReplace: {
                  input: "$content.email",
                  pattern: "\\s+",
                  replacement: "",
                },
              },
            },
          },
        },
        // Remove all numbers from description
        descriptionNoNumbers: {
          $regexReplace: {
            input: "$content.description",
            pattern: "\\d+",
            replacement: "",
          },
        },
        // Normalize multiple exclamation marks
        normalizedDescription: {
          $regexReplace: {
            input: {
              $regexReplace: {
                input: "$content.description",
                pattern: "!{2,}",
                replacement: "!",
              },
            },
            pattern: "\\s+",
            replacement: " ",
          },
        },
        // Remove HTML tags
        plainText: {
          $regexReplace: {
            input: "$content.htmlContent",
            pattern: "<[^>]+>",
            replacement: "",
          },
        },
        // Extract domain from URL
        domain: {
          $regexReplace: {
            input: "$content.url",
            pattern: "https?://",
            replacement: "",
          },
        },
        // Normalize punctuation
        cleanPunctuation: {
          $regexReplace: {
            input: "$content.messyText",
            pattern: "\\.{2,}",
            replacement: ".",
          },
        },
        // Convert snake_case to space-separated with case conversion
        readableCode: {
          $toUpper: {
            $substr: {
              value: {
                $regexReplace: {
                  input: "$content.code",
                  pattern: "_",
                  replacement: " ",
                },
              },
              start: 0,
              length: 1,
            },
          },
        },
        // Complex conditional with regex
        sanitizedStatus: {
          $cond: {
            if: { $eq: ["$metadata.priority", 3] },
            then: {
              $concat: [
                "HIGH-",
                {
                  $toUpper: {
                    $regexReplace: {
                      input: "$metadata.status",
                      pattern: "[^a-z]",
                      replacement: "",
                      flags: "gi",
                    },
                  },
                },
              ],
            },
            else: "$metadata.status",
          },
        },
        // Word count after normalization
        wordCount: {
          $size: {
            $split: {
              input: {
                $trim: {
                  input: {
                    $regexReplace: {
                      input: "$content.userInput",
                      pattern: "\\s+",
                      replacement: " ",
                    },
                  },
                },
              },
              delimiter: " ",
            },
          },
        },
        // Case-insensitive replacement
        replacedGreat: {
          $regexReplace: {
            input: "$content.description",
            pattern: "great",
            replacement: "excellent",
            flags: "gi",
          },
        },
      };

      const result = Forgefy.this(textData, blueprint);

      expect(result).toEqual({
        normalizedInput: "Hello World! How are you?",
        cleanPhone: "5551234567",
        cleanDocument: "12345678910",
        processedEmail: "user@example.com",
        descriptionNoNumbers: "Product is GREAT!!!   Buy now!!!",
        normalizedDescription: "Product123 is GREAT! Buy456 now!",
        plainText: "Hello World",
        domain: "example.com/path?query=value",
        cleanPunctuation: "too.many.dots and!!!exclamation!!marks!",
        readableCode: "V",
        sanitizedStatus: "HIGH-ACTIVE",
        wordCount: 5,
        replacedGreat: "Product123 is excellent!!!   Buy456 now!!!",
      });
    });

    it("should handle complex regex patterns with lookaheads and word boundaries", () => {
      const data = {
        text: "Replace Hello and World but not HelloWorld",
        numbers: "abc123def456ghi789",
        mixed: "TEST test TeSt",
      };

      const blueprint = {
        // Word boundary replacement
        replacedWords: {
          $regexReplace: {
            input: "$text",
            pattern: "\\b(Hello|World)\\b",
            replacement: "Goodbye",
          },
        },
        // Extract only letters
        onlyLetters: {
          $regexReplace: {
            input: "$numbers",
            pattern: "\\d+",
            replacement: "",
          },
        },
        // Case insensitive with flag
        unified: {
          $regexReplace: {
            input: "$mixed",
            pattern: "test",
            replacement: "demo",
            flags: "gi",
          },
        },
      };

      const result = Forgefy.this(data, blueprint);

      expect(result).toEqual({
        replacedWords: "Replace Goodbye and Goodbye but not HelloWorld",
        onlyLetters: "abcdefghi",
        unified: "demo demo demo",
      });
    });

    it("should combine regexReplace with other operators for data validation", () => {
      const formData = {
        fields: {
          name: "  John   Doe  ",
          email: "  JOHN.DOE@EXAMPLE.COM  ",
          phone: "(555) 123-4567",
          zip: "12345-6789",
          bio: "Hello!!!   I   love   coding!!!",
        },
      };

      const blueprint = {
        cleanName: {
          $trim: {
            input: {
              $regexReplace: {
                input: "$fields.name",
                pattern: "\\s+",
                replacement: " ",
              },
            },
          },
        },
        emailLower: {
          $toLower: {
            $trim: {
              input: {
                $regexReplace: {
                  input: "$fields.email",
                  pattern: "\\s",
                  replacement: "",
                },
              },
            },
          },
        },
        phoneDigits: {
          $regexReplace: {
            input: "$fields.phone",
            pattern: "\\D",
            replacement: "",
          },
        },
        zipCode: {
          $regexReplace: {
            input: "$fields.zip",
            pattern: "-",
            replacement: "",
          },
        },
        bioNormalized: {
          $trim: {
            input: {
              $regexReplace: {
                input: {
                  $regexReplace: {
                    input: "$fields.bio",
                    pattern: "!+",
                    replacement: "!",
                  },
                },
                pattern: "\\s+",
                replacement: " ",
              },
            },
          },
        },
        hasValidPhone: {
          $eq: [
            {
              $size: {
                $regexReplace: {
                  input: "$fields.phone",
                  pattern: "\\D",
                  replacement: "",
                },
              },
            },
            10,
          ],
        },
      };

      const result = Forgefy.this(formData, blueprint);

      expect(result).toEqual({
        cleanName: "John Doe",
        emailLower: "john.doe@example.com",
        phoneDigits: "5551234567",
        zipCode: "123456789",
        bioNormalized: "Hello! I love coding!",
        hasValidPhone: true,
      });
    });
  });
});
