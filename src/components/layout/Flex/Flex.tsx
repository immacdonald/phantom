import type { ComponentCSSProps, FlexAlign, ResponsiveType } from '@types';
import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { useResponsiveContext } from '@contexts';
import style from './Flex.module.scss';

type FlexDirection = 'row' | 'column';

interface FlexProps extends ComponentCSSProps {
    children?: ReactNode;
    flex?: ResponsiveType<FlexDirection>;
    align?: ResponsiveType<FlexAlign>;
    verticalAlign?: ResponsiveType<FlexAlign>;
    gap?: ResponsiveType<React.CSSProperties['gap']>;
    relative?: boolean;
}

const Flex: React.FC<FlexProps> = ({ children, flex, align, verticalAlign, gap, relative = false, className, cssProperties }) => {
    const { parse } = useResponsiveContext();

    const flexClasses = clsx(style.flex, className);
    const flexDirection = parse<FlexDirection>(flex);

    return (
        <div
            className={flexClasses}
            style={{
                flexDirection: flexDirection,
                alignItems: parse<FlexAlign>(flexDirection == 'column' ? align : verticalAlign),
                justifyContent: parse<FlexAlign>(flexDirection == 'column' ? verticalAlign : align),
                gap: parse<React.CSSProperties['gap']>(gap),
                position: relative ? 'relative' : undefined,
                ...cssProperties
            }}
        >
            {children}
        </div>
    );
};

export { Flex };
