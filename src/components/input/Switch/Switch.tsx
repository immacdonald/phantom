import type { CommonComponentProps } from '@types';
import { FC } from 'react';
import style from './Switch.module.scss';

interface SwitchProps extends CommonComponentProps<HTMLInputElement> {}

const Switch: FC<SwitchProps> = ({ ...props }) => {
    return (
        <div className={style.switch}>
            <input type="checkbox" data-switch {...props} />
            <span />
        </div>
    );
};

export { Switch };
