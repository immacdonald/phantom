import { CSSProperties } from 'react';

// Responsive design and component system
export type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ResponsiveObject<T> = {
    base: T;
    xs?: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
};

export type ResponsiveType<T> = T | ResponsiveObject<T>;

export interface ComponentCSSProps {
    className?: string;
    properties?: CSSProperties;
}

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

export interface Position {
    x: number;
    y: number;
}

// Utility
type CallbackOne<T> = (arg1: T) => void;
type CallbackTwo<T, U> = (arg1: T, arg2: U) => void;
type CallbackThree<T, U, V> = (arg1: T, arg2: U, arg3: V) => void;
type CallbackFour<T, U, V, W> = (arg1: T, arg2: U, arg3: V, arg4: W) => void;
type CallbackFive<T, U, V, W, X> = (arg1: T, arg2: U, arg3: V, arg4: W, arg5: X) => void;
export type Callback<T, U = void, V = void, W = void, X = void> = CallbackOne<T> | CallbackTwo<T, U> | CallbackThree<T, U, V> | CallbackFour<T, U, V, W> | CallbackFive<T, U, V, W, X>;
