import type { Callback } from '@types';
import { ChangeEvent, FC } from 'react';
import style from './Switch.module.scss';

interface SwitchProps {
    state: boolean;
    onChange?: Callback<boolean>;
}

const Switch: FC<SwitchProps> = ({ state, onChange = (): void => {} }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.checked);
        }
    }

    return (
        <div className={style.switch}>
            <input type="checkbox" onChange={handleChange} checked={state} data-switch />
            <span />
        </div>
    );
};

export { Switch };
