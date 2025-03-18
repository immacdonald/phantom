import { CSSProperties, HTMLAttributes } from 'react';

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
interface CommonComponentProps<T = HTMLElement> extends Omit<HTMLAttributes<T>, 'align' | 'children' | 'className' | 'id' | 'style'> {
    className?: string;
    style?: CSSProperties;
    id?: string;
}

type VisualContext = 'primary' | 'secondary' | 'accent' | 'positive' | 'critical' | 'warning' | 'info';

type FlexAlignSimple = 'start' | 'center' | 'end';

type FlexAlign = 'start' | 'center' | 'end' | 'space-around' | 'space-between' | 'space-evenly';

type Theme = 'light' | 'dark';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type { Breakpoints, CommonComponentProps, FlexAlign, FlexAlignSimple, HeadingTag, ResponsiveObject, ResponsiveType, Theme, VisualContext };
