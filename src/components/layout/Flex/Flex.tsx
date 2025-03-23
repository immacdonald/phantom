import type { CommonComponentProps, FlexAlign, ResponsiveType } from '@types';
import type { CSSProperties, FC, ReactNode } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';
import { useResponsiveContext } from '@contexts';
import styles from './Flex.module.scss';

type FlexDirection = 'row' | 'column';

interface FlexProps extends CommonComponentProps<HTMLDivElement> {
    /** The child elements inside the flex container. */
    children?: ReactNode;

    /** Defines the flex direction. */
    flex?: ResponsiveType<FlexDirection>;

    /** Controls horizontal alignment. */
    align?: ResponsiveType<FlexAlign>;

    /** Controls vertical alignment. */
    verticalAlign?: ResponsiveType<FlexAlign>;

    /** Specifies the gap between flex items, with responsive support. */
    gap?: ResponsiveType<CSSProperties['gap']>;

    /** Sets position as relative. */
    relative?: boolean;
}

/** A responsive flexbox container component with configurable alignment, direction, and spacing. */
const Flex: FC<FlexProps> = forwardRef<HTMLDivElement, FlexProps>(({ children, flex, align, verticalAlign, gap, relative = false, className, style, ...props }, ref) => {
    const { parse } = useResponsiveContext();

    const flexClasses = clsx(styles.flex, className);
    const flexDirection = parse<FlexDirection>(flex);

    return (
        <div
            className={flexClasses}
            style={{
                flexDirection: flexDirection,
                alignItems: parse<FlexAlign>(flexDirection === 'column' ? align : verticalAlign),
                justifyContent: parse<FlexAlign>(flexDirection === 'column' ? verticalAlign : align),
                gap: parse<CSSProperties['gap']>(gap),
                position: relative ? 'relative' : undefined,
                ...style
            }}
            ref={ref}
            role="group"
            {...props}
        >
            {children}
        </div>
    );
});

export { Flex };
export type { FlexProps };
