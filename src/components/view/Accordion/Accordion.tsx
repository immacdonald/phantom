import clsx from 'clsx';
import React, { ComponentType, ReactNode, useEffect, useRef, useState } from 'react';
import { Button } from '../../';
import { useInterval } from '../../../hooks';
import { Chevron } from '../../../icons';
import { Callback, ComponentCSSProps, PollingRate } from '../../../types';
import { IconProps } from '../../Icon/Icon';
import style from './Accordion.module.scss';

interface AccordionProps extends ComponentCSSProps {
    label: string;
    Icon?: ComponentType<IconProps>;
    defaultState?: boolean;
    onClick?: Callback<void>;
    children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ label, Icon = Chevron, defaultState = false, className, cssProperties, onClick = () => {}, children }) => {
    const [open, setState] = useState<boolean>(false);
    const [height, setHeight] = useState<number>(0);
    const ref = useRef<HTMLDivElement>(null);

    const poll = () => {
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
            [style.open]: open
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
                    visual="ghost"
                    Icon={Icon}
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
