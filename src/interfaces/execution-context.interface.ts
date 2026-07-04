export interface ExecutionContext {
  context?: Record<string, unknown>;
  // Array context variables for $map, $filter, $reduce
  $current?: any; // Current element being processed
  $accumulated?: any; // Accumulated value (only in $reduce)
  $index?: number; // Current index
  // When true, expression resolution rethrows errors instead of swallowing
  // them to null. Propagated from the top-level transformation options so that
  // unknown operators and operator failures become diagnosable.
  strict?: boolean;
}
