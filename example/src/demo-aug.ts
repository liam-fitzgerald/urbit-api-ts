export type Action = 'increment' | 'decrement';

export interface Update {
  value: number;
}



declare module 'urbit-api-ts/lib/marks' {
  interface Marks {
    'ts-demo-action': Action;
    'ts-demo-update': Update;
  }
}
