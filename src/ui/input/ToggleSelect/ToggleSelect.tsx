import classNames from 'classnames';
import { FC, useMemo, useState } from 'react';
import { Callback, NullablePrimitive } from '../../../types';
import { getKeyByValue } from '../../../utility';
import { Button } from '../Button';
import style from './ToggleSelect.module.scss';

interface ToggleProps {
    options?: string[] | Record<string, NullablePrimitive>;
    defaultValue?: NullablePrimitive;
    full?: boolean;
    disabled?: boolean;
    onChange?: Callback<NullablePrimitive>;
}

const ToggleSelect: FC<ToggleProps> = ({ options = ['No', 'Maybe', 'Yes'], defaultValue, full = false, disabled = false, onChange = () => {} }: ToggleProps) => {
    const trueOptions = useMemo(() => {
        if (Array.isArray(options)) {
            const computed: Record<string, string> = {};
            options.forEach((option: string) => {
                computed[option] = option;
            });
            return computed;
        } else {
            return options;
        }
    }, [options]);

    const [selected, setSelection] = useState<string | null>(getKeyByValue(trueOptions, defaultValue) ?? null);
    const handleChange = (key: string) => {
        setSelection(key);
        onChange(trueOptions[key]);
    };

    const selectClasses = classNames(style.select, {
        [style.full]: full,
        [style.disabled]: disabled
    });

    return (
        <div className={selectClasses}>
            {Object.keys(trueOptions).map((option: string, index: number) => {
                return <Button key={index} label={option} visual={selected == option ? 'filled' : 'ghost'} onClick={() => handleChange(option)} customStyle={style.option} />;
            })}
        </div>
    );
};

export { ToggleSelect };
