declare global {
  interface Global {
    get dbg(): undefined;
  }
  
  const dbg: number;
  
  const WORD_LEN: number;
  const MAX_GUESSES: number;
  const GREEN: string;
  const YELLOW: string;
  const GRAY: string;
  const RUN_ALL: string;
  const GO_BALLS_DEEP: string;
  const SHUFFLE_DECISIVE: boolean;
  
  const l: Console['log'] & { 
    count: number;
    get x(): number;
  };
  
  function lj(
    separator: string,
    ...vals: any[]
  ): undefined;
  function lje(...vals: any[]): undefined;
  function ljs(...vals: any[]): undefined;
  function ljn(...vals: any[]): undefined;
  
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
    
    last: T | undefined;
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