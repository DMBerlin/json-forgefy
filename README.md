# JSON-PARSEFY
This project helps with flattening JSON strings who have repeatedly through a stringed process.
It applies a `JSONParse` method on a stringify data and repeat the process through each node, flattening it until it becomes a JSON object.

Example:

```ts
const before: string = "{\"name\": \"John Doe\",\"age\": \"30\",\"location\": {\"city\": \"Some City\",\"state\": \"Some State\",\"geo\": \"{\\\"lat\\\": \\\"40000\\\",\\\"lng\\\": \\\"40000\\\"}\"},\"rules\": {\"localWork\": \"true\",\"onlineWork\": \"true\",\"applications\": {\"admin\": \"true\",\"time\": \"no-time\"}},\"availability\": \"{\\\"online\\\": \\\"true\\\"}\"}";
```

Use `Parsefy` to do a BFS JSON parse on the string.

```ts
import { Parsefy } from "json-parsefy";
const after = Parsefy.this(before);
```

How it should look after parsing:

```ts
const after: Record<string, any> = {
  name: "John Doe",
    age: 30,
  location: {
  city: "Some City",
    state: "Some State",
    geo: { lat: 40000, lng: 40000 },
},
  rules: {
    localWork: true,
      onlineWork: true,
      applications: { admin: true, time: "no-time" },
  },
  availability: { online: true },
};
```
