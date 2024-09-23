import { CommonComponentProps } from '@types';
import React, { forwardRef } from 'react';

const withCommonProps = <P extends object, T extends HTMLElement = HTMLDivElement>(WrappedComponent: React.ComponentType<P>) => {
    const ComponentWithRef = forwardRef<T, P & CommonComponentProps>(({ className, style, id, ...rest }, ref) => {
        return <WrappedComponent className={className} style={style} {...(rest as P)} ref={ref} id={id} />;
    });

    return ComponentWithRef;
};

export { withCommonProps };
