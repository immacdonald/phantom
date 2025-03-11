import type { CommonComponentProps, NullablePrimitive, Option } from '@types';
import { FC, useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import clsx from 'clsx';
import style from './Dropdown.module.scss';

interface MultiDropdownProps extends Omit<CommonComponentProps, 'defaultValue' | 'onChange'> {
    /** The list of available options for the multi-select dropdown. */
    options: Option[];

    /** Allows clearing the selected values. */
    isClearable?: boolean;

    /** The default selected values when the component mounts. */
    defaultValue?: NullablePrimitive[];

    /** The currently selected values (controlled component). */
    value?: NullablePrimitive[];

    /** Placeholder text displayed when no options are selected. */
    placeholder?: string;

    /** Disables user interaction with the dropdown. */
    disabled?: boolean;

    /** Callback function triggered when the selection changes. */
    onChange?: (selected: NullablePrimitive[]) => void;
}

/** A customizable multi-select dropdown component with support for accessibility, clearing, and controlled values. */
const MultiDropdown: FC<MultiDropdownProps> = ({ options = [], isClearable = true, defaultValue = null, placeholder, disabled = false, onChange = (): void => {}, className, ...props }) => {
    const [internalValue, setInternalValue] = useState<Option[] | null>();

    /** Converts an array of selected values into corresponding option objects. */
    const valueToOption = (input: NullablePrimitive[] | null): Option[] | null => {
        return input != null ? options.filter((option) => input.includes(option.value)) : null;
    };

    useEffect(() => {
        setInternalValue(valueToOption(defaultValue));
    }, [defaultValue]);

    /** Handles selection changes and updates internal state. */
    const handleChange = (selected: MultiValue<Option | null>): void => {
        const selectedValue: NullablePrimitive[] = selected ? selected.map((option) => option!.value) : [];
        setInternalValue(valueToOption(selectedValue));
        onChange(selectedValue);
    };

    return (
        <Select
            {...props}
            className={clsx(style.select, className)}
            classNamePrefix="select"
            options={options}
            isMulti={true}
            isClearable={isClearable}
            value={internalValue}
            placeholder={placeholder || 'Select'}
            isDisabled={disabled}
            unstyled
            menuPortalTarget={document.body}
            onChange={handleChange}
            aria-label={placeholder || 'Multi-select dropdown'}
        />
    );
};

export { MultiDropdown };
