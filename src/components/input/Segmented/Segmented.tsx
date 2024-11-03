import type { Callback, CommonComponentProps, NullablePrimitive, Option } from '@types';
import { CSSProperties, FC, useState } from 'react';
import clsx from 'clsx';
import { Button } from '@components';
import styles from './Segmented.module.scss';

interface SegmentedProps extends Omit<CommonComponentProps, 'onChange'> {
    options?: Option[];
    defaultValue?: number;
    full?: boolean;
    disabled?: boolean;
    onChange?: Callback<NullablePrimitive>;
}

const Segmented: FC<SegmentedProps> = ({ options = [{ value: 'Default', label: 'Default' }], defaultValue, full, disabled, onChange = (): void => {}, className, style }) => {
    const [selected, setSelection] = useState<number | null>(defaultValue ?? null);
    const handleChange = (index: number): void => {
        setSelection(index);
        onChange(options[index].value);
    };

    const segmentedClasses = clsx(
        styles.segmented,
        {
            [styles.full]: full,
            [styles.disabled]: disabled
        },
        className
    );

    const properties: CSSProperties = {
        '--v-count': options.length,
        '--v-selected': selected,
        ...style
    } as CSSProperties;

    return (
        <div className={segmentedClasses}>
            {options.map((option: Option, index: number) => {
                const isSelected = selected == index;
                return (
                    <Button
                        key={index}
                        variant="ghost"
                        onClick={() => handleChange(index)}
                        full={full}
                        style={{ zIndex: '1', color: isSelected ? 'var(--color-text-on-primary)' : 'var(--context-color)' }}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </Button>
                );
            })}
            {selected != null && <div className={styles.indicator} style={properties} />}
        </div>
    );
};

export { Segmented };
