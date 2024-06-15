// Polling and updating
export enum PollingRate {
    FPS120 = 8,
    FPS60 = 16,
    FPS30 = 33,
    QuarterSecond = 250,
    HalfSecond = 500,
    Second = 1000
}

// Simple data structures
export type Primitive = string | number | boolean;
export type NullablePrimitive = Primitive | null;
export interface Dimensions {
    width: number;
    height: number;
}

export type Option = {
    value: NullablePrimitive;
    label: string;
    disabled?: boolean;
};

export interface Position {
    x: number;
    y: number;
}

// Utility
export type Callback<T> = (value: T) => void;
type MultiCallbackTwo<T, U> = (arg1: T, arg2: U) => void;
type MultiCallbackThree<T, U, V> = (arg1: T, arg2: U, arg3: V) => void;
type MultiCallbackFour<T, U, V, W> = (arg1: T, arg2: U, arg3: V, arg4: W) => void;
type MultiCallbackFive<T, U, V, W, X> = (arg1: T, arg2: U, arg3: V, arg4: W, arg5: X) => void;
export type MultiCallback<T, U, V = void, W = void, X = void> = MultiCallbackTwo<T, U> | MultiCallbackThree<T, U, V> | MultiCallbackFour<T, U, V, W> | MultiCallbackFive<T, U, V, W, X>;

export * from './styling';
