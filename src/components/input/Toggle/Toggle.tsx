import type { Callback, CommonComponentProps } from '@types';
import { CSSProperties, ChangeEvent, FC, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import style from './Toggle.module.scss';

interface ToggleProps extends Omit<CommonComponentProps, 'onChange'> {
    /** The label displayed when the toggle is in the "on" position. */
    checked?: string;

    /** The label displayed when the toggle is in the "off" position. */
    notChecked?: string;

    /** The default state of the toggle when it mounts. */
    defaultState?: boolean;

    /** Disables the toggle, preventing user interaction. */
    disabled?: boolean;

    /** Callback function triggered when the toggle state changes. */
    onChange?: Callback<boolean>;
}

/** A customizable toggle switch component with labeled states. */
const Toggle: FC<ToggleProps> = forwardRef<HTMLInputElement, ToggleProps>(({ checked = 'Yes', notChecked = 'No', defaultState = false, disabled = false, onChange, ...props }, ref) => {
    /** Handles state changes and triggers the `onChange` callback. */
    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
                onChange(event.target.checked);
            }
        },
        [onChange]
    );

    const before = useRef<HTMLSpanElement>(null);
    const after = useRef<HTMLSpanElement>(null);
    const [width, setWidth] = useState<number | null>(null);

    useEffect(() => {
        if (!width && before.current && after.current) {
            setWidth(2 * Math.max(before.current?.clientWidth, after.current?.clientWidth));
        }
    }, [width]);

    const properties = useMemo(
        () =>
            width
                ? ({
                      '--toggle-width': `calc(${width}px + 2 * var(--toggle-padding))`,
                      '--toggle-half': 'calc(50% - var(--toggle-padding))'
                  } as CSSProperties)
                : undefined,
        [width]
    );

    const toggleClasses = clsx(style.toggle, {
        [style.disabled]: disabled
    });

    return (
        <div className={toggleClasses} style={properties} role="switch" aria-checked={defaultState} aria-disabled={disabled} {...props}>
            <input type="checkbox" className={style.checkbox} defaultChecked={defaultState} onChange={handleChange} disabled={disabled} ref={ref} />
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
});

export { Toggle };
