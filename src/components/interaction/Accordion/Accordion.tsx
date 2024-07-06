import type { ButtonStyle, Callback, ComponentCSSProps } from '@types';
import { PollingRate } from '@types';
import { ComponentType, FC, ReactNode, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Chevron } from '@assets/icons';
import { Button, IconProps } from '@components';
import { useInterval } from '@hooks';
import style from './Accordion.module.scss';

interface AccordionProps extends ComponentCSSProps {
    label: string;
    borderless?: boolean;
    compact?: boolean;
    buttonStyle?: ButtonStyle;
    Icon?: ComponentType<IconProps> | null;
    defaultState?: boolean;
    onClick?: Callback<void>;
    children: ReactNode;
}

const Accordion: FC<AccordionProps> = ({ label, borderless, compact, buttonStyle, Icon = Chevron, defaultState = false, className, cssProperties, onClick = (): void => {}, children }) => {
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
        style.accordion,
        {
            [style.open]: open,
            [style.border]: !borderless,
            [style.margins]: !compact
        },
        className
    );

    return (
        <div className={accordionClasses} style={cssProperties}>
            <div className={style.toggle}>
                <Button
                    label={label}
                    onClick={() => {
                        setState(!open);
                        onClick();
                    }}
                    visual={buttonStyle ?? 'ghost'}
                    Icon={Icon ?? undefined}
                    align="space-between"
                    iconRight
                    full
                    className={style.button}
                />
            </div>
            <div className={style.wrapper} style={{ height: `${height}px` }}>
                <div className={style.content} ref={ref}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export { Accordion };
