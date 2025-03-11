import { CommonComponentProps, PollingRate } from '@types';
import { FC, HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Anchor } from '@components';
import { useOutsideClick } from '@hooks';
import style from './Popover.module.scss';

interface PopoverProps extends Omit<CommonComponentProps, 'content'> {
    /** The content displayed inside the popover. */
    content: ReactNode;

    /** The direction in which the popover appears relative to the trigger element. */
    direction?: 'bottom' | 'top' | 'left' | 'right';

    /** Highlights the popover for emphasis. */
    highlight?: boolean;

    /** The delay (in milliseconds) before the popover appears on hover. */
    delay?: number;

    /** Additional class name for the anchor container. */
    anchorClass?: string;

    /** Additional props for the anchor element. */
    anchorProps?: HTMLAttributes<HTMLDivElement>;

    /** Enables toggling the popover visibility via click instead of hover. */
    clickToToggle?: boolean;

    /** The trigger element that activates the popover. */
    children: ReactNode;
}

/** A floating popover component that appears on hover or click, supporting configurable delays and positioning. */
const Popover: FC<PopoverProps> = ({ content, direction = 'top', highlight = false, delay = 500, anchorClass, anchorProps, clickToToggle = false, className, children, ...props }) => {
    const [click, setClick] = useState<boolean>(false);
    const [hover, setHover] = useState<boolean>(false);
    const hoverTimeout = useRef<number | null>(null);
    const isMounted = useRef<boolean>(false);

    useEffect(() => {
        isMounted.current = true;
        return (): void => {
            isMounted.current = false;

            if (hoverTimeout.current) {
                clearTimeout(hoverTimeout.current);
            }
        };
    }, []);

    /** Starts the hover delay timer to show the popover if not already visible. */
    const hoverPopover = (): void => {
        if (!hover) {
            hoverTimeout.current = window.setTimeout(() => {
                if (isMounted.current) {
                    setHover(true);
                }
            }, delay);
        }
    };

    /** Clears the hover delay timer and hides the popover when the mouse leaves. */
    const hoverExitPopover = (): void => {
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
        }
        hoverTimeout.current = null;
        setHover(false);
    };

    const ref = useRef<HTMLDivElement>(null);

    /** Hides the popover when clicking outside of it. */
    const onOutsideClick = (): void => {
        setClick(false);
        setHover(false);
    };

    useOutsideClick(ref, () => onOutsideClick());

    const popoverClasses = clsx(
        style.popover,
        {
            [style.highlight]: highlight
        },
        className
    );

    const fullAnchorProps = {
        ...(!clickToToggle ? { onMouseEnter: hoverPopover, onMouseLeave: hoverExitPopover } : {}),
        ...(clickToToggle ? { onClick: (): void => setClick(!click) } : {}),
        ...anchorProps
    };

    const displayPopover = hover || click;

    return (
        <Anchor
            direction={direction}
            anchorClass={anchorClass}
            anchorProps={fullAnchorProps}
            component={
                <div className={popoverClasses} {...props}>
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
