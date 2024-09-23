import type { ButtonStyle, Callback, CommonComponentProps } from '@types';
import { PollingRate } from '@types';
import { ComponentType, FC, ReactNode, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ChevronIcon } from '@assets/icons';
import type { IconProps } from '@components';
import { Button } from '@components';
import { useInterval } from '@hooks';
import styles from './Accordion.module.scss';

interface AccordionProps extends Omit<CommonComponentProps, 'onClick'> {
    label: string;
    borderless?: boolean;
    compact?: boolean;
    buttonStyle?: ButtonStyle;
    Icon?: ComponentType<IconProps> | null;
    defaultState?: boolean;
    onClick?: Callback<void>;
    children: ReactNode;
}

const Accordion: FC<AccordionProps> = ({ label, borderless, compact, buttonStyle, Icon = ChevronIcon, defaultState = false, className, style, onClick = (): void => {}, children }) => {
    const [open, setState] = useState<boolean>(false);
    const [height, setHeight] = useState<number>(0);
    const ref = useRef<HTMLDivElement>(null);

    const poll = (): void => {
        setHeight((open && ref.current?.scrollHeight) || 0);
    };

    useInterval(() => {
        poll();
    }, PollingRate.FPS30);

    useEffect(() => {
        setState(defaultState);
    }, []);

    const accordionClasses = clsx(
        styles.accordion,
        {
            [styles.open]: open,
            [styles.border]: !borderless,
            [styles.margins]: !compact
        },
        className
    );

    return (
        <div className={accordionClasses} style={style}>
            <div className={styles.toggle}>
                <Button
                    onClick={() => {
                        setState(!open);
                        onClick();
                    }}
                    visual={buttonStyle ?? 'ghost'}
                    Icon={Icon ?? undefined}
                    align="space-between"
                    iconRight
                    full
                    className={styles.button}
                >
                    {label}
                </Button>
            </div>
            <div className={styles.wrapper} style={{ height: `${height}px` }}>
                <div className={styles.content} ref={ref}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export { Accordion };
