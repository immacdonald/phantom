import { CSSProperties } from 'react';

// Responsive design and component system
type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type ResponsiveObject<T> = {
    base: T;
    xs?: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
};

type ResponsiveType<T> = T | ResponsiveObject<T>;

// Styling
interface ComponentProps {
    className?: string;
    cssProperties?: CSSProperties;
    id?: string;
}

type StyleContext = 'primary' | 'dark' | 'light' | 'secondary' | 'accent' | 'positive' | 'critical' | 'warning' | 'info';

type FlexAlign = 'start' | 'center' | 'end' | 'space-around' | 'space-between' | 'space-evenly';

type ButtonStyle = 'ghost' | 'outline' | 'filled' | 'text' | 'clear';

type Theme = 'light' | 'dark';

export type { Breakpoints, ButtonStyle, ComponentProps, FlexAlign, ResponsiveObject, ResponsiveType, StyleContext, Theme };
