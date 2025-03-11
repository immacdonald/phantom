import type { CommonComponentProps } from '@types';
import { CSSProperties, FC, forwardRef, useMemo } from 'react';
import clsx from 'clsx';
import styles from './Loading.module.scss';

interface LoadingProps extends CommonComponentProps {
    /** Defines the size of the loading indicator in pixels. */
    size?: number;

    /** Sets the thickness of the loading animation. */
    thickness?: number;

    /** Custom width for the loading container. */
    width?: string;

    /** Custom height for the loading container. */
    height?: string;

    /** Defines the minimum height of the loading container. */
    minHeight?: string;

    /** The color of the loading indicator. */
    color?: string;
}

/** A customizable loading spinner component with support for size, thickness, and color adjustments. */
const Loading: FC<LoadingProps> = forwardRef<HTMLDivElement, LoadingProps>(({ size, thickness, width, height, minHeight, color, className, style, ...props }, ref) => {
    const properties: CSSProperties = useMemo(
        () => ({
            '--v-size': size ? `${size}px` : undefined,
            '--v-thickness': thickness ? `${thickness}px` : undefined,
            '--v-width': width,
            '--v-height': height,
            '--v-min-height': minHeight,
            '--v-color': color,
            ...style
        }),
        [size, thickness, width, height, minHeight, color, style]
    );

    return (
        <div className={clsx(styles.loading, className)} style={properties} ref={ref} role="status" aria-live="polite" {...props}>
            <div />
            <div />
            <div />
        </div>
    );
});

export { Loading };
