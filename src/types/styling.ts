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

// Styling
export interface ComponentCSSProps {
    className?: string;
    cssProperties?: CSSProperties;
}

export type StyleContext = 'primary' | 'secondary' | 'accent' | 'positive' | 'critical' | 'warning' | 'info';

export type FlexAlign = 'start' | 'center' | 'end' | 'space-around' | 'space-between' | 'space-evenly';
