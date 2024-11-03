import type { CommonComponentProps } from '@types';
import { CSSProperties, FC, forwardRef, useMemo } from 'react';
import clsx from 'clsx';
import styles from './Loading.module.scss';

interface LoadingProps extends CommonComponentProps {
    size?: number;
    thickness?: number;
    width?: string;
    height?: string;
    minHeight?: string;
    color?: string;
}

const Loading: FC<LoadingProps> = forwardRef<HTMLDivElement, LoadingProps>(({ size, thickness, width, height, minHeight, color, className, style, ...rest }, ref) => {
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
        <div className={clsx(styles.loading, className)} style={properties} ref={ref} {...rest}>
            <div />
            <div />
            <div />
        </div>
    );
});

export { Loading };
