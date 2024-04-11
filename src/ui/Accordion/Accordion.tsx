import { Button } from '..'
import classNames from 'classnames';
import React, { ReactNode, useRef, useState } from 'react';
import style from './Accordion.module.scss';

interface CollapsibleProps {
    label: string;
    Icon: any;
    children: ReactNode;
}

const Accordion: React.FC<CollapsibleProps> = ({ label, Icon, children }) => {
    const [open, setOpen] = useState<boolean>(false);

    const toggle = () => {
        setOpen(!open);
    };

    const contentRef = useRef<HTMLDivElement>(null);

    const accordionClasses = classNames(style.accordion, {
        [style.open]: open
    });

    const height = ((open && contentRef.current?.scrollHeight) || 0) + 'px';

    return (
        <div className={accordionClasses}>
            <div className={style.toggle}>
                <Button label={label} onClick={toggle} visual="ghost" Icon={Icon} full customStyle={style.button} />
            </div>
            <div className={style.wrapper} ref={contentRef} style={{ height }}>
                <div className={style.content}>{children}</div>
            </div>
        </div>
    );
};

export { Accordion };
