
import { useUrbitApi, Cage } from 'urbit-api-ts';
import './demo-aug';



export const actionCage: Cage<'ts-demo-action'> = { application: 'ts-demo', mark: 'ts-demo-action', data: 'increment'};

export const updateCage: Cage<'ts-demo-update'> = { application: 'ts-demo', mark: 'ts-demo-update', data: { value: 2 }};


export const badCage: Cage<'ts-demo-update'> = { application: 'ts-demo', mark: 'ts-demo-update', data: 'increment'};
