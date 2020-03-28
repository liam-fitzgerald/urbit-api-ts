import React, { useState, useCallback, useEffect, useReducer } from "react";
import _ from "lodash";
import { Marks } from "./marks";

declare global {
  interface Window {
    ship: string;
    urb: any;
  }
}

export type Mark = keyof Marks;

export interface Cage<M extends Mark> {
  application: string;
  mark: M;
  data: Marks[M];
}

type UpdateHandler = <M extends Mark>(cage: Cage<M>) => void;


export function useUrbitApi(
  ship: string,
  onUpdate: UpdateHandler
) {
  const [bindPaths, setBindPaths] = useState([]);

  const bind = useCallback(
    <M extends Mark>(application: string, path: string, mark: M): void => {
      setBindPaths(paths => _.uniq([...paths, path]));

      window.urb.subscribe(
        ship,
        application,
        path,
        (err: any) => {
          console.log(err);
        },
        (data: Marks[M]) => {
          onUpdate({ application, mark, data });
        },
        (err: any) => {
          console.log(err);
        }
      );
    },
    [onUpdate, setBindPaths, ship]
  );

  const poke = useCallback(<M extends Mark>(
    application: string,
    mark: M,
    data: Marks[M]
  ) => {
    return new Promise<void>((resolve, reject) => {
      window.urb.poke(
        ship,
        application,
        mark,
        data,
        () => {
          resolve();
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }, []);

  return { poke, bind, bindPaths };
}
