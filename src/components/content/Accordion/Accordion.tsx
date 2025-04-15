import type { Callback, CommonComponentProps, FlexAlign } from '@types';
import { PollingRate } from '@types';
import type { ButtonStyle, IconProps } from '@components';
import type { ComponentType, CSSProperties, FC, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ChevronIcon } from '@assets/icons';
import { Button } from '@components';
import { useInterval } from '@hooks';
import styles from './Accordion.module.scss';

interface AccordionProps extends Omit<CommonComponentProps, 'onClick'> {
    /** The label displayed on the accordion button. */
    label: string;

    /** Removes the border. */
    borderless?: boolean;

    /** Reduces the margin and padding to create a more compact appearance. */
    compact?: boolean;

    /** An optional icon to be displayed alongside the label. */
    Icon?: ComponentType<IconProps> | null;

    /** Flex alignment of the accordion label and icon. */
    labelAlignment?: FlexAlign;

    /** Whether the icon should be on the left or right of the label. */
    iconLeft?: boolean;

    /** The initial open/closed state of the accordion. */
    defaultState?: boolean;

    /** Callback function triggered when the accordion button is clicked. */
    onClick?: Callback<void>;

    /** Class for the inner content container. */
    innerClassName?: string;

    /** Styles for the inner content container. */
    innerStyle?: CSSProperties;

    /** Visual style of the accordion internal button. */
    buttonStyle?: ButtonStyle;

    /** The content inside the accordion. */
    children: ReactNode;
}

const pollingRate = PollingRate.FPS30;

/**
 * An expandable and collapsible section that can display content when toggled.
 * Supports optional icons, border styles, and compact mode.
 */
const Accordion: FC<AccordionProps> = ({
    label,
    borderless,
    compact,
    Icon = ChevronIcon,
    labelAlignment = 'space-between',
    iconLeft,
    defaultState = false,
    className,
    style,
    onClick,
    innerClassName,
    innerStyle,
    buttonStyle,
    children
}) => {
    const [open, setState] = useState<boolean>(false);
    const [height, setHeight] = useState<number>(0);
    const ref = useRef<HTMLDivElement>(null);
    const [instant, setInstant] = useState<boolean>(true);

    /** Updates the height of the accordion content dynamically. */
    const poll = (): void => {
        setHeight((open && ref.current?.scrollHeight) || 0);
    };

    useInterval(() => {
        poll();
    }, pollingRate);

    useEffect(() => {
        if (defaultState) {
            // On first render set height instantly if default open
            setHeight(ref.current?.scrollHeight ?? 0);
        }
        setState(defaultState);
        setTimeout(() => setInstant(false), pollingRate * 2);
    }, [defaultState]);

    const accordionClasses = clsx(
        styles.accordion,
        {
            [styles.open]: open,
            [styles.border]: !borderless,
            [styles.margins]: !compact,
            [styles.instant]: instant
        },
        className
    );

    return (
        <div className={accordionClasses} style={style}>
            <div className={styles.toggle}>
                <Button
                    onClick={() => {
                        setState(!open);
                        onClick?.();
                    }}
                    variant={buttonStyle || 'ghost'}
                    Icon={Icon ?? undefined}
                    align={labelAlignment}
                    iconRight={!iconLeft}
                    full
                    className={styles.button}
                >
                    {label}
                </Button>
            </div>
            <div className={styles.wrapper} style={{ height: `${height}px` }}>
                <div className={clsx(styles.content, innerClassName)} style={innerStyle} ref={ref}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export { Accordion };
