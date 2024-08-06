import { $regex } from "./regex.operator";
import { RegexOperatorInput } from "../types/operator-input.types";

describe("regex operator", () => {
  it("should return true if the value matches the pattern", () => {
    const value: string = "johndoe@email.com";
    const pattern: string = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
    const input: RegexOperatorInput = { value, pattern };

    const result: boolean = $regex()(input);
    expect(result).toBe(true);
  });
});
