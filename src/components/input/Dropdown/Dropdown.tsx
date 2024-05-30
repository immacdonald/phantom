import React, { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { NullablePrimitive } from '../../../types';
import style from './Dropdown.module.scss';

interface DropdownProps {
    options: NullablePrimitive[];
    isMulti?: boolean;
    isClearable?: boolean;
    defaultValue?: NullablePrimitive;
    placeholder?: string;
    disabled?: boolean;
    onChange?: (selected: NullablePrimitive) => void;
}

type DropdownOption = {
    value: NullablePrimitive;
    label: string;
};

const makeOptions = (options: NullablePrimitive[]) => {
    return options.map((option) => ({ value: option, label: `${option}` }));
};

const Dropdown: React.FC<DropdownProps> = ({ options = [], isClearable = true, defaultValue = null, placeholder, disabled = false, onChange = () => {} }) => {
    const formattedOptions: DropdownOption[] = makeOptions(options);

    const [internalValue, setInternalValue] = useState<DropdownOption | null>();

    const valueToOption = (input: NullablePrimitive): DropdownOption | null => {
        return input ? formattedOptions.find((option) => option.value === input) || null : null;
    };

    useEffect(() => {
        setInternalValue(valueToOption(defaultValue));
    }, [defaultValue]);

    const handleChange = (selected: DropdownOption | null) => {
        let selectedValue: NullablePrimitive = null;

        if (selected != null) {
            selectedValue = (selected as DropdownOption).value;
        }

        setInternalValue(valueToOption(selectedValue));
        onChange(selectedValue);
    };

    return (
        <Select
            className={style.select}
            classNamePrefix="select"
            options={formattedOptions}
            isMulti={false}
            isClearable={isClearable}
            value={internalValue}
            placeholder={placeholder || 'Select'}
            isDisabled={disabled}
            unstyled
            menuPortalTarget={document.body}
            onChange={handleChange}
        />
    );
};

interface MultiDropdownProps {
    options: NullablePrimitive[];
    isClearable?: boolean;
    defaultValue?: NullablePrimitive[];
    value?: NullablePrimitive[];
    placeholder?: string;
    disabled?: boolean;
    onChange?: (selected: NullablePrimitive[]) => void;
}

const MultiDropdown: React.FC<MultiDropdownProps> = ({ options = [], isClearable = true, defaultValue = null, placeholder, disabled = false, onChange = () => {} }) => {
    const formattedOptions: DropdownOption[] = makeOptions(options);

    const [internalValue, setInternalValue] = useState<DropdownOption[] | null>();

    const valueToOption = (input: NullablePrimitive[] | null): DropdownOption[] | null => {
        return input ? formattedOptions.filter((option) => input.includes(option.value)) : null;
    };

    useEffect(() => {
        setInternalValue(valueToOption(defaultValue));
    }, [defaultValue]);

    const handleChange = (selected: MultiValue<DropdownOption | null>) => {
        let selectedValue: (NullablePrimitive | null)[] = [];

        if (selected != null) {
            selectedValue = selected.map((option) => option!.value);
        }

        setInternalValue(valueToOption(selectedValue));
        onChange(selectedValue);
    };

    return (
        <Select
            className={style.select}
            classNamePrefix="select"
            options={formattedOptions}
            isMulti={true}
            isClearable={isClearable}
            value={internalValue}
            placeholder={placeholder || 'Select'}
            isDisabled={disabled}
            unstyled
            menuPortalTarget={document.body}
            onChange={handleChange}
        />
    );
};

export { Dropdown, MultiDropdown };
