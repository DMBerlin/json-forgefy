export type JsonValidTypes =
  | string
  | number
  | boolean
  | null
  | JsonValidTypes[]
  | { [key: string]: JsonValidTypes };
