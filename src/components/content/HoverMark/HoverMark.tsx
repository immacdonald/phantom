import type { ForwardRefExoticComponent, HTMLAttributes, ReactNode, RefAttributes } from 'react';
import { forwardRef } from 'react';
import style from './HoverMark.module.scss';

interface HoverMarkProps extends HTMLAttributes<HTMLElement> {
    /** The text or element to be highlighted. */
    children?: ReactNode;
}

/** A component that highlights text when hovered. */
const HoverMark = forwardRef<HTMLElement, HoverMarkProps>(({ children, ...props }, ref) => {
    return (
        <mark className={style.hoverMark} ref={ref} {...props}>
            {children}
        </mark>
    );
}) as ForwardRefExoticComponent<HoverMarkProps & RefAttributes<HTMLElement>>;

export { HoverMark };
