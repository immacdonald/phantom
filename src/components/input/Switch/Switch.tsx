import type { Callback } from '@types';
import React, { useCallback } from 'react';
import style from './Switch.module.scss';

interface SwitchProps {
    state: boolean;
    onChange?: Callback<boolean>;
}

const Switch: React.FC<SwitchProps> = ({ state, onChange = () => {} }) => {
    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.checked);
        }
    }, []);

    return (
        <label className={style.switch}>
            <input type="checkbox" onChange={handleChange} checked={state} />
            <span />
        </label>
    );
};

export { Switch };
