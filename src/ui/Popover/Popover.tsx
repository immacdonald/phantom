import classNames from 'classnames';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { Anchor } from '../Anchor';
import style from './Popover.module.scss';

interface PopoverProps {
    content: ReactNode;
    direction?: 'bottom' | 'top' | 'left' | 'right';
    highlight?: boolean;
    delay?: number;
    customStyle?: string;
    canHover?: boolean;
    canClick?: boolean;
    children: ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ content, direction = 'top', highlight = false, delay = 500, customStyle = null, canHover = true, canClick = false, children }) => {
    const [click, setClick] = useState<boolean>(false);
    const [hover, setHover] = useState<boolean>(false);
    const hoverTimeout = useRef<number | null>(null);

    const isMounted = useRef<boolean>(false);
    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    const hoverPopover = () => {
        // If hovering and not already hovering, start the hover delay timer to then display the popover
        if (!hover) {
            hoverTimeout.current = window.setTimeout(() => {
                if (isMounted.current) {
                    setHover(true);
                }
            }, delay);
        }
    };

    const hoverExitPopover = () => {
        // If a hover delay timer exists upon exit, cancel it
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
        }
        hoverTimeout.current = null;
        setHover(false);
    };

    const ref: React.MutableRefObject<any> = useRef();
    useOutsideClick(ref, () => onOutsideClick());

    const onOutsideClick = () => {
        setClick(false);
        setHover(false);
    };

    const popoverClasses = classNames(
        style.popover,
        {
            [style.highlight]: highlight
        },
        customStyle
    );

    const anchorProps = {
        onMouseEnter: canHover ? hoverPopover : undefined,
        onMouseLeave: canHover ? hoverExitPopover : undefined,
        onClick: canClick ? () => setClick(!click) : undefined
    };

    const displayPopover = hover || click;

    return (
        <Anchor
            direction={direction}
            anchorProps={anchorProps}
            component={
                <div className={popoverClasses}>
                    <div className={style.popoverInner}>{content}</div>
                </div>
            }
            componentClassName={popoverClasses}
            visible={displayPopover}
            innerRef={ref}
        >
            {children}
        </Anchor>
    );
};

export { Popover };
