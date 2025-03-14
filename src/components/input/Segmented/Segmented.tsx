import type { Callback, CommonComponentProps, NullablePrimitive, Option } from '@types';
import { CSSProperties, FC, forwardRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Button } from '@components';
import styles from './Segmented.module.scss';

interface SegmentedProps extends Omit<CommonComponentProps, 'onChange'> {
    /** Array of selectable options, each containing a `value` and `label`. */
    options?: Option[];

    /** The default selected index when the component mounts. */
    defaultValue?: number;

    /** The currently selected index (controlled component). */
    value?: number;

    /** Expands the segmented control to full width. */
    full?: boolean;

    /** Disables all buttons inside the segmented control. */
    disabled?: boolean;

    /** Callback function triggered when a selection is made. */
    onChange?: Callback<NullablePrimitive>;
}

/** A segmented button group that allows users to toggle between multiple options. */
const Segmented: FC<SegmentedProps> = forwardRef<HTMLDivElement, SegmentedProps>(
    ({ options = [{ value: 'Default', label: 'Default' }], defaultValue, value, full, disabled, onChange = (): void => {}, className, style }, ref) => {
        const [selected, setSelection] = useState<number | null>(value ?? defaultValue ?? null);

        /** Handles selection changes and triggers the `onChange` callback. */
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

        useEffect(() => {
            if (value !== undefined) {
                setSelection(value);
            }
        }, [value]);

        return (
            <div className={segmentedClasses} role="radiogroup" aria-disabled={disabled} ref={ref}>
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
                            role="radio"
                            aria-checked={isSelected}
                            aria-disabled={option.disabled}
                        >
                            {option.label}
                        </Button>
                    );
                })}
                {selected != null && <div className={styles.indicator} style={properties} />}
            </div>
        );
    }
);

export { Segmented };
