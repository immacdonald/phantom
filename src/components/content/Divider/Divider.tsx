import type { CommonComponentProps } from '@types';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';

interface DividerProps extends CommonComponentProps<HTMLHRElement> {
    /** Expands the divider beyond its container by the specified length. */
    expand?: string;

    /** Vertical padding for the divider. */
    space?: string;
}

/** A horizontal divider with optional expansion beyond its container. */
const Divider = forwardRef<HTMLHRElement, DividerProps>(({ expand, space, style, ...props }, ref) => {
    const computedStyle = {
        ...(expand ? { marginInline: `calc(-1 * ${expand})`, width: `calc(100% + 2 * ${expand})` } : {}),
        ...(space ? { marginBlock: space } : {}),
        ...style
    };

    return <hr style={{ ...computedStyle }} ref={ref} {...props} />;
}) as ForwardRefExoticComponent<DividerProps & RefAttributes<HTMLHRElement>>;

export { Divider };
