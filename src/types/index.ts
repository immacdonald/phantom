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

// Simple data structures
export interface Dimensions {
    width: number;
    height: number;
}

export interface Position {
    x: number;
    y: number;
}

// Utility
export type Callback<T> = (reponse: T) => void;
