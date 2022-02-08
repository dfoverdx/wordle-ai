declare global {  
  const dbg: number;
  
  const WORD_LEN: number;
  const MAX_GUESSES: number;
  const GREEN: string;
  const YELLOW: string;
  const GRAY: string;
  const RUN_ALL: string;
  const GO_BALLS_DEEP: string;
  const SHUFFLE_DECISIVE: boolean;
  const RUNNING_ON_MOBILE: boolean;
  
  const l: Console['log'] & { 
    count: number;
    readonly x: number;
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
    
    sum(...vals: (number | number[])[]): number;
    avg(...vals: (number | number[])[]): number;
    product(...vals: (number | number[])[]): number;
  }
  
  interface Array<T> {
    eachAnd(cb: Parameters<Array<T>['forEach'][0]): this;
    shuffle(inPlace?: true): this;
    shuffle(inPlace: false): Array<T>;
    chooseRandom(): T;
    joinNL(): string;
    
    last: T | undefined;
  }
  
  interface PromiseConstructor {
    sleep(ms?: number): Promise<void>;
  }
  
  interface String extends Omit<
    Array<string>, 
    keyof string
  > {
    splitNL(): string[];
  }
    
  interface ObjectConstructor {
    mapObject<T, U>(
      obj: T,
      cb:
        <K extends keyof T>(
          entry: [K, T[K]],
          index: number
        ) => [K, U]
    ): Record<keyof T, U>;
  }
}
  
export {}