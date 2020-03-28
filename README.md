# Urbit Typescript bindings

Through the magic of typescript, `urbit-api-ts` maintains a map from marks to
interfaces. It is however the developer's job to keep these updated. The general
form of adding a mark is as follows.

``` typescript
// Anywhere in your project
export type Action = 'increment' | 'decrement';
export interface Update {
  count: number;
}


// Maps the Action interface to the 'ts-demo-action' mark
declare module 'urbit-api-ts/lib/marks' {
   interface Marks {
     'ts-demo-action': Action;
     'ts-demo-update': Update;
   }
}
```

This will then ensure that subscriptions and pokes have correct type inference

``` typescript
// Somewhere in the root component
const { bind, poke } = useUrbitApi(window.ship, onUpdate);

// type checks correctly
poke('ts-demo', 'ts-demo-action', 'increment')

// fails to type check
poke('ts-demo', 'ts-demo-value', 'increment');

// Elsewhere,
const onUpdate: UpdateHandler = ({ application, mark, value }) => {
  switch(mark) {
    case 'ts-demo-update':
      //  typechecks correctly
      const { count } = value;
      console.log(value);
    case 'ts-demo-action':
      // does not typecheck
      const { count } = value;
      console.log(value);
  }
}

```

