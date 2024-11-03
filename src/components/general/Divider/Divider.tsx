import { CommonComponentProps } from '@types';
import { FC, forwardRef } from 'react';

interface DividerProps extends CommonComponentProps<HTMLHRElement> {
    expand?: string;
}

const Divider: FC<DividerProps> = forwardRef<HTMLHRElement, DividerProps>(({ expand, style, ...props }, ref) => {
    const computedStyle = expand ? { marginInline: `calc(-1 * ${expand})`, width: `calc(100% + 2 * ${expand})`, ...style } : style;

    return <hr style={{ ...computedStyle }} ref={ref} {...props} />;
});

export { Divider };
