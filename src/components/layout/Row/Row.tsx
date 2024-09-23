import type { CommonComponentProps, FlexAlign, ResponsiveType } from '@types';
import { CSSProperties, FC, forwardRef, ReactNode, useMemo } from 'react';
import { useResponsiveContext, useStyleContext } from '@contexts';
import styles from './Row.module.scss';

interface RowProps extends CommonComponentProps {
    children?: ReactNode;
    align?: ResponsiveType<FlexAlign>;
    verticalAlign?: ResponsiveType<FlexAlign>;
    gap?: ResponsiveType<CSSProperties['gap']>;
    relative?: boolean;
}

const Row: FC<RowProps> = forwardRef<HTMLDivElement, RowProps>(({ children, align, verticalAlign, gap, relative = false, className, style, ...rest }, ref) => {
    const { parse } = useResponsiveContext();
    const { computeClasses } = useStyleContext();

    const classes = computeClasses(styles.row, 'row', className);

    const rowStyle: CSSProperties = useMemo(
        () => ({
            justifyContent: parse<FlexAlign>(align) || 'flex-start',
            alignItems: parse<FlexAlign>(verticalAlign) || 'stretch',
            gap: parse<CSSProperties['gap']>(gap) || '0px',
            position: relative ? 'relative' : undefined,
            ...style
        }),
        [align, verticalAlign, gap, relative, style, parse]
    );

    return (
        <div className={classes} style={rowStyle} ref={ref} {...rest}>
            {children}
        </div>
    );
});

export { Row };
export type { RowProps };
