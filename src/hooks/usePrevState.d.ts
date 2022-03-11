import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
} from 'react';

export default function usePrevState<S>(
  initialState: S | (() => S)
): [
  S,
  Dispatch<SetStateAction<S>>,
  MutableRefObject<S>,
  () => S
];

export default function usePrevState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>,
  MutableRefObject<S | undefined>,
  () => S | undefined
];