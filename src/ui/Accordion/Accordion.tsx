import classNames from 'classnames';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Button } from '..';
import style from './Accordion.module.scss';

interface CollapsibleProps {
    label: string;
    Icon: any;
    defaultState?: boolean;
    className?: string;
    children: ReactNode;
}

const Accordion: React.FC<CollapsibleProps> = ({ label, Icon, defaultState = false, className, children }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [transition, setTransition] = useState<ReturnType<typeof setTimeout> | null>(null);

    const setState = (state: boolean) => {
        setOpen(state);
        // Add a transition state during the transition
        if (transition) {
            clearTimeout(transition);
        }
        setTransition(
            setTimeout(() => {
                setTransition(null);
            }, 500)
        );
    };

    const contentRef = useRef<HTMLDivElement>(null);

    const accordionClasses = classNames(
        style.accordion,
        {
            [style.open]: open,
            [style.transition]: transition != null
        },
        className
    );

    const height = ((open && contentRef.current?.scrollHeight) || 0) + 'px';

    useEffect(() => {
        setState(defaultState);
    }, [defaultState]);

    return (
        <div className={accordionClasses}>
            <div className={style.toggle}>
                <Button label={label} onClick={() => setState(!open)} visual="ghost" Icon={Icon} full customStyle={style.button} />
            </div>
            <div className={style.wrapper} ref={contentRef} style={{ height }}>
                <div className={style.content}>{children}</div>
            </div>
        </div>
    );
};

export { Accordion };
