import classNames from 'classnames';
import React, { ReactNode, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { Button } from '..';
import style from './Accordion.module.scss';
import { useResponsiveContext } from '../../contexts';

interface CollapsibleProps {
    label: string;
    Icon: any;
    defaultState?: boolean;
    className?: string;
    children: ReactNode;
}

const Accordion: React.FC<CollapsibleProps> = ({ label, Icon, defaultState = false, className, children }) => {
    const [open, setOpen] = useState<boolean>(false);
    const transition = useRef<boolean>(false);
    const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Use window size to force a re-render on dimension changes
    const { windowSize: _ } = useResponsiveContext();
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const setState = (state: boolean) => {
        setOpen(state);
        transitionState();
    };

    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const accordionClasses = classNames(
        style.accordion,
        {
            [style.open]: open,
            [style.transition]: transition.current
        },
        className
    );

    const transitionState = () => {
        // Add a transition state during the transition
        if (transitionTimeout.current) {
            clearTimeout(transitionTimeout.current);
        }

        transition.current = true;
        transitionTimeout.current = setTimeout(() => {
            transition.current = false;
            transitionTimeout.current = null;
            forceUpdate();
        }, 500)
    }
    
    // Calculate the height of each render to ensure the exact space is used
    const height = useRef<number>(0);
    const lastHeight = useRef<number>(0);

    height.current = ((open && contentRef.current?.scrollHeight) || 0);
    if(height.current != lastHeight.current) {
        transitionState();
        lastHeight.current = height.current;
    }

    useEffect(() => {
        setState(defaultState);
    }, [defaultState]);

    return (
        <div className={accordionClasses}>
            <div className={style.toggle}>
                <Button label={label} onClick={() => setState(!open)} visual="ghost" Icon={Icon} full customStyle={style.button} />
            </div>
            <div className={style.wrapper} ref={wrapperRef} style={{ height: `${height.current}px` }}>
                <div className={style.content} ref={contentRef}>{children}</div>
            </div>
        </div>
    );
};

export { Accordion };
