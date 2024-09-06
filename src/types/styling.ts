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

type VisualContext = 'primary' | 'dark' | 'light' | 'secondary' | 'accent' | 'positive' | 'critical' | 'warning' | 'info';

type FlexAlign = 'start' | 'center' | 'end' | 'space-around' | 'space-between' | 'space-evenly';

type ButtonStyle = 'ghost' | 'outline' | 'filled' | 'text' | 'clear';

type Theme = 'light' | 'dark';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type { Breakpoints, ButtonStyle, ComponentProps, FlexAlign, HeadingTag, ResponsiveObject, ResponsiveType, Theme, VisualContext };
