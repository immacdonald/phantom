export type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ResponsiveObject<T> = {
    base: T,
    xs?: T,
    sm?: T,
    md?: T,
    lg?: T,
    xl?: T
};

export type ResponsiveType<T> = T | ResponsiveObject<T>;

export type Callback<T> = (reponse: T) => void;

