import type { BackgroundDepth, CommonComponentProps } from '@types';
import type { CSSProperties, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';
import { useResponsiveContext } from '@contexts';
import { tokens } from '@styles/tokens';
import styles from './Box.module.scss';

interface BoxProps extends CommonComponentProps<HTMLDivElement> {
    /** Determines the background color of the section. */
    background?: BackgroundDepth;

    /** Adds a border to the box. */
    border?: boolean;

    /** Removes the default border radius corner rounding. */
    sharp?: boolean;

    /** Internal padding of the box. */
    padding?: string;

    /** Takes up 100% of available width. */
    block?: boolean;

    /** Takes up 100% of available height. */
    stretch?: boolean;

    /** The text or element to be highlighted. */
    children?: ReactNode;
}

/** A basic styled box component. */
const Box = forwardRef<HTMLDivElement, BoxProps>(({ background, border, sharp, padding, block, stretch, className, style, children, ...props }, ref) => {
    const { parse } = useResponsiveContext();

    const boxClasses = clsx(
        styles.box,
        {
            [styles.border]: border,
            [styles.sharp]: sharp,
            [styles.block]: parse<boolean>(block),
            [styles.stretch]: parse<boolean>(stretch)
        },
        className
    );

    const boxStyle: CSSProperties = {
        ...(background && { '--background-color': tokens.color.background[background] }),
        ...(padding && { padding: padding }),
        ...style
    };

    return (
        <div className={boxClasses} style={boxStyle} ref={ref} {...props}>
            {children}
        </div>
    );
}) as ForwardRefExoticComponent<BoxProps & RefAttributes<HTMLDivElement>>;

export { Box };
