import { PollingRate } from '@types';
import { FC, HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Anchor } from '@components';
import { useOutsideClick } from '@hooks';
import style from './Popover.module.scss';

interface PopoverProps {
    content: ReactNode;
    direction?: 'bottom' | 'top' | 'left' | 'right';
    highlight?: boolean;
    delay?: number;
    anchorClass?: string;
    anchorProps?: HTMLAttributes<HTMLDivElement>;
    customStyle?: string;
    canHover?: boolean;
    canClick?: boolean;
    children: ReactNode;
}

const Popover: FC<PopoverProps> = ({ content, direction = 'top', highlight = false, delay = 500, anchorClass, anchorProps, customStyle = null, canHover = true, canClick = false, children }) => {
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

    const hoverPopover = (): void => {
        // If hovering and not already hovering, start the hover delay timer to then display the popover
        if (!hover) {
            hoverTimeout.current = window.setTimeout(() => {
                if (isMounted.current) {
                    setHover(true);
                }
            }, delay);
        }
    };

    const hoverExitPopover = (): void => {
        // If a hover delay timer exists upon exit, cancel it
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
        }
        hoverTimeout.current = null;
        setHover(false);
    };

    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, () => onOutsideClick());

    const onOutsideClick = (): void => {
        setClick(false);
        setHover(false);
    };

    const popoverClasses = clsx(
        style.popover,
        {
            [style.highlight]: highlight
        },
        customStyle
    );

    const fullAnchorProps = {
        ...(canHover ? { onMouseEnter: hoverPopover, onMouseLeave: hoverExitPopover } : {}),
        ...(canClick ? { onClick: () => setClick(!click) } : {}),
        ...anchorProps
    };

    const displayPopover = hover || click;

    return (
        <Anchor
            direction={direction}
            anchorClass={anchorClass}
            anchorProps={fullAnchorProps}
            component={
                <div className={popoverClasses}>
                    <div className={style.popoverInner}>{content}</div>
                </div>
            }
            componentClassName={popoverClasses}
            visible={displayPopover}
            innerRef={ref}
            pollingInterval={PollingRate.FPS60}
        >
            {children}
        </Anchor>
    );
};

export { Popover };
