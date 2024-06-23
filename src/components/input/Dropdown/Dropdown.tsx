import type { NullablePrimitive, Option } from '@types';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import style from './Dropdown.module.scss';

interface DropdownProps {
    options: Option[];
    isMulti?: boolean;
    isClearable?: boolean;
    defaultValue?: NullablePrimitive;
    placeholder?: string;
    disabled?: boolean;
    onChange?: (selected: NullablePrimitive) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options = [], isClearable = true, defaultValue = null, placeholder, disabled = false, onChange = () => {} }) => {
    const [internalValue, setInternalValue] = useState<Option | null>(null);

    const valueToOption = (input: NullablePrimitive): Option | null => {
        return input ? options.find((option) => option.value === input) || null : null;
    };

    useEffect(() => {
        setInternalValue(valueToOption(defaultValue));
    }, [defaultValue]);

    const handleChange = (selected: Option | null) => {
        let selectedValue: NullablePrimitive = null;

        if (selected != null) {
            selectedValue = (selected as Option).value;
        }

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
        />
    );
};

export { Dropdown };
