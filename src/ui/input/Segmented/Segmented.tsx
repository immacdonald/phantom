import clsx from 'clsx';
import { FC, useState } from 'react';
import { Callback, NullablePrimitive } from '../../../types';
import { getKeyByValue } from '../../../utility';
import { Button } from '../Button';
import style from './Segmented.module.scss';

interface SegmentedProps {
    options?: Record<string, NullablePrimitive>;
    defaultValue?: NullablePrimitive;
    full?: boolean;
    disabled?: boolean;
    onChange?: Callback<NullablePrimitive>;
}

const Segmented: FC<SegmentedProps> = ({ options = { Default: 'Default' }, defaultValue, full = false, disabled = false, onChange = () => {} }) => {
    const [selected, setSelection] = useState<string | null>(getKeyByValue(options, defaultValue) ?? null);
    const handleChange = (key: string) => {
        setSelection(key);
        onChange(options[key]);
    };

    const segmentedClasses = clsx(style.segmented, {
        [style.full]: full,
        [style.disabled]: disabled
    });

    return (
        <div className={segmentedClasses}>
            {Object.keys(options).map((option: string, index: number) => {
                return <Button key={index} label={option} visual={selected == option ? 'filled' : 'ghost'} onClick={() => handleChange(option)} className={style.option} />;
            })}
        </div>
    );
};

export { Segmented };
