import clsx from 'clsx';
import React, { CSSProperties, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Callback } from '../../../types';
import style from './Toggle.module.scss';

interface ToggleProps {
    checked?: string;
    notChecked?: string;
    defaultState?: boolean;
    disabled?: boolean;
    onChange?: Callback<boolean>;
}

const Toggle: FC<ToggleProps> = ({ checked = 'Yes', notChecked = 'No', defaultState = false, disabled = false, onChange = () => {} }: ToggleProps) => {
    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.checked);
        }
    }, []);

    const before = useRef<HTMLSpanElement>(null);
    const after = useRef<HTMLSpanElement>(null);

    const [width, setWidth] = useState<number | null>(null);

    useEffect(() => {
        if (!width && before.current && after.current) {
            setWidth(2 * Math.max(before.current?.clientWidth, after.current?.clientWidth));
        }
    }, [before, after]);

    const properties = useMemo(() => (width ? ({ '--v-width': `calc(${width}px + 2 * var(--v-padding))`, '--v-half': 'calc(50% - var(--v-padding))' } as CSSProperties) : undefined), [width]);

    const toggleClasses = clsx(style.toggle, {
        [style.disabled]: disabled
    });

    return (
        <div className={toggleClasses} style={properties}>
            <input type="checkbox" className={style.checkbox} defaultChecked={defaultState} onChange={handleChange} disabled={disabled} />
            <div className={style.states} style={width ? undefined : { visibility: 'hidden' }}>
                <span ref={before} className={style.before}>
                    {notChecked}
                </span>
                <span className={style.indicator}></span>
                <span ref={after} className={style.after}>
                    {checked}
                </span>
            </div>
        </div>
    );
};

export { Toggle };
