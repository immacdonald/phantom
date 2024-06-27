import { Dispatch, SetStateAction } from 'react';

// Polling and updating
enum PollingRate {
    FPS120 = 8,
    FPS60 = 16,
    FPS30 = 33,
    QuarterSecond = 250,
    HalfSecond = 500,
    Second = 1000
}

// Simple data structures
type Primitive = string | number | boolean;
type NullablePrimitive = Primitive | null;
interface Dimensions {
    width: number;
    height: number;
}

type Option = {
    value: NullablePrimitive;
    label: string;
    disabled?: boolean;
};

interface Position {
    x: number;
    y: number;
}

type SetState<T> = Dispatch<SetStateAction<T>>;

type LoadedImage = {
    src: string;
    width: number;
    height: number;
};

// Utility
type Callback<T> = (value: T) => void;
type MultiCallbackTwo<T, U> = (arg1: T, arg2: U) => void;
type MultiCallbackThree<T, U, V> = (arg1: T, arg2: U, arg3: V) => void;
type MultiCallbackFour<T, U, V, W> = (arg1: T, arg2: U, arg3: V, arg4: W) => void;
type MultiCallbackFive<T, U, V, W, X> = (arg1: T, arg2: U, arg3: V, arg4: W, arg5: X) => void;
type MultiCallback<T, U, V = void, W = void, X = void> = MultiCallbackTwo<T, U> | MultiCallbackThree<T, U, V> | MultiCallbackFour<T, U, V, W> | MultiCallbackFive<T, U, V, W, X>;

export * from './styling';

export type { Callback, Dimensions, LoadedImage, MultiCallback, NullablePrimitive, Option, Position, Primitive, SetState };
export { PollingRate };
