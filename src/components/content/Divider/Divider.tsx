import { CommonComponentProps } from '@types';
import { FC, forwardRef } from 'react';

interface DividerProps extends CommonComponentProps<HTMLHRElement> {
    /** Expands the divider beyond its container by the specified length. */
    expand?: string;

    /** Vertical padding for the divider. */
    space?: string;
}

/** A horizontal divider with optional expansion beyond its container. */
const Divider: FC<DividerProps> = forwardRef<HTMLHRElement, DividerProps>(({ expand, space, style, ...props }, ref) => {
    const computedStyle = {
        ...(expand ? {marginInline: `calc(-1 * ${expand})`, width: `calc(100% + 2 * ${expand})`} : {}), 
        ...(space ? {marginBlock: space} : {}),
        ...style
    }

    return <hr style={{ ...computedStyle }} ref={ref} {...props} />;
});

export { Divider };
