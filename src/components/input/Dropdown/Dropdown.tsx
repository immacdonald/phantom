import type { CommonComponentProps, NullablePrimitive, Option } from '@types';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import style from './Dropdown.module.scss';

interface DropdownProps extends Omit<CommonComponentProps, 'defaultValue' | 'onChange'> {
    /** The list of options available in the dropdown. */
    options: Option[];

    /** Allows clearing the selected value. */
    isClearable?: boolean;

    /** The default selected value. */
    defaultValue?: NullablePrimitive;

    /** Placeholder text displayed when no option is selected. */
    placeholder?: string;

    /** Disables user interaction with the dropdown. */
    disabled?: boolean;

    /** Callback function triggered when an option is selected. */
    onChange?: (selected: NullablePrimitive) => void;
}

/** A customizable dropdown select component with support for accessibility, clearing, and controlled values. */
const Dropdown: FC<DropdownProps> = ({ options = [], isClearable = true, defaultValue = null, placeholder, disabled = false, onChange = (): void => {}, ...props }) => {
    const [internalValue, setInternalValue] = useState<Option | null>(null);

    /** Converts a primitive value to a corresponding option from the provided options list. */
    const valueToOption = (input: NullablePrimitive): Option | null => {
        return input != null ? options.find((option) => option.value === input) || null : null;
    };

    useEffect(() => {
        setInternalValue(valueToOption(defaultValue));
    }, [defaultValue]);

    /** Handles selection changes and updates the internal state. */
    const handleChange = (selected: Option | null): void => {
        const selectedValue: NullablePrimitive = selected ? selected.value : null;
        setInternalValue(valueToOption(selectedValue));
        onChange(selectedValue);
    };

    return (
        <Select
            className={style.select}
            classNamePrefix="select"
            options={options}
            isMulti={false}
            isClearable={isClearable}
            value={internalValue}
            placeholder={placeholder || 'Select'}
            isDisabled={disabled}
            unstyled
            menuPortalTarget={document.body}
            onChange={handleChange}
            aria-label={placeholder || 'Dropdown select'}
            {...props}
        />
    );
};

export { Dropdown };
