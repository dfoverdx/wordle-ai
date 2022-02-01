declare global {
  interface Global {
    get dbg(): undefined;
  }
  
  const dbg: undefined;
  
  const l: Console['log'] & { 
    count: number;
    get x(): undefined;
  };
  
  function lj(
    separator: string,
    ...vals: any[]
  ): undefined;
  function lje(...vals: any[]): undefined;
  function ljs(...vals: any[]): undefined;
  
  interface Math {
    roundTo(num: number, places?: number): number;
    
    randInt(max: number): number;
    randInt(min: number, max: number): number;
  }
  
  interface Array<T> {
    eachAnd(cb: Parameters<Array<T>['forEach'][0]): this;
    shuffle(inPlace?: true): this;
    shuffle(inPlace: false): Array<T>;
    chooseRandom(): T;
  }
  
  interface PromiseConstructor {
    sleep(ms?: number): Promise<void>;
  }
  
  interface String 
    extends Omit<Array<string>, keyof string> {}
    
  interface ObjectConstructor {
    mapObject<T, U>(
      obj: T,
      cb: <K extends keyof T>(
          entry: [K, T[K]],
          index: number
        ) => [K, U]
    ): Record<keyof T, U>;
  }
}
  
export {}