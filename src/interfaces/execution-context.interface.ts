export interface ExecutionContext {
  context?: Record<string, unknown>;
  // Array context variables for $map, $filter, $reduce
  $current?: any; // Current element being processed
  $accumulated?: any; // Accumulated value (only in $reduce)
  $index?: number; // Current index
}
