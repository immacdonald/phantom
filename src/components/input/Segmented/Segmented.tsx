import clsx from 'clsx';
import { FC, useState } from 'react';
import { Callback, ComponentCSSProps, NullablePrimitive } from '../../../types';
import { Button } from '../Button';
import style from './Segmented.module.scss';

export type Option = {
    value: NullablePrimitive;
    label: string;
    disabled?: boolean;
};

interface SegmentedProps extends ComponentCSSProps {
    options?: Option[];
    defaultValue?: number;
    full?: boolean;
    disabled?: boolean;
    onChange?: Callback<NullablePrimitive>;
}

const Segmented: FC<SegmentedProps> = ({ options = [{ value: 'Default', label: 'Default' }], defaultValue, full = false, disabled = false, onChange = () => {}, className, cssProperties }) => {
    const [selected, setSelection] = useState<number | null>(defaultValue ?? null);
    const handleChange = (index: number) => {
        setSelection(index);
        onChange(options[index].value);
    };

    const segmentedClasses = clsx(
        style.segmented,
        {
            [style.full]: full,
            [style.disabled]: disabled
        },
        className
    );

    const properties: React.CSSProperties = {
        '--v-count': options.length,
        '--v-selected': selected,
        ...cssProperties
    } as React.CSSProperties;

    return (
        <div className={segmentedClasses}>
            {options.map((option: Option, index: number) => {
                const isSelected = selected == index;
                return (
                    <Button
                        key={index}
                        label={option.label}
                        visual="ghost"
                        onClick={() => handleChange(index)}
                        full={full}
                        cssProperties={{ zIndex: '1', color: isSelected ? 'var(--color-text-on-primary)' : 'var(--context-color)' }}
                        disabled={option.disabled}
                    />
                );
            })}
            {selected != null && <div className={style.indicator} style={properties} />}
        </div>
    );
};

export { Segmented };
