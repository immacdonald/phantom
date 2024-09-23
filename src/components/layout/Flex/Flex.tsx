import type { CommonComponentProps, FlexAlign, ResponsiveType } from '@types';
import { CSSProperties, FC, ReactNode } from 'react';
import clsx from 'clsx';
import { useResponsiveContext } from '@contexts';
import styles from './Flex.module.scss';

type FlexDirection = 'row' | 'column';

interface FlexProps extends CommonComponentProps {
    children?: ReactNode;
    flex?: ResponsiveType<FlexDirection>;
    align?: ResponsiveType<FlexAlign>;
    verticalAlign?: ResponsiveType<FlexAlign>;
    gap?: ResponsiveType<CSSProperties['gap']>;
    relative?: boolean;
}

const Flex: FC<FlexProps> = ({ children, flex, align, verticalAlign, gap, relative = false, className, style, id }) => {
    const { parse } = useResponsiveContext();

    const flexClasses = clsx(styles.flex, className);
    const flexDirection = parse<FlexDirection>(flex);

    return (
        <div
            className={flexClasses}
            style={{
                flexDirection: flexDirection,
                alignItems: parse<FlexAlign>(flexDirection == 'column' ? align : verticalAlign),
                justifyContent: parse<FlexAlign>(flexDirection == 'column' ? verticalAlign : align),
                gap: parse<CSSProperties['gap']>(gap),
                position: relative ? 'relative' : undefined,
                ...style
            }}
            id={id}
        >
            {children}
        </div>
    );
};

export { Flex };
