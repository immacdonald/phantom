import type { NullablePrimitive, Option } from '@types';
import { FC, useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import style from './Dropdown.module.scss';

interface MultiDropdownProps {
    options: Option[];
    isClearable?: boolean;
    defaultValue?: NullablePrimitive[];
    value?: NullablePrimitive[];
    placeholder?: string;
    disabled?: boolean;
    onChange?: (selected: NullablePrimitive[]) => void;
}

const MultiDropdown: FC<MultiDropdownProps> = ({ options = [], isClearable = true, defaultValue = null, placeholder, disabled = false, onChange = (): void => {} }) => {
    const [internalValue, setInternalValue] = useState<Option[] | null>();

    const valueToOption = (input: NullablePrimitive[] | null): Option[] | null => {
        return input ? options.filter((option) => input.includes(option.value)) : null;
    };

    useEffect(() => {
        setInternalValue(valueToOption(defaultValue));
    }, [defaultValue]);

    const handleChange = (selected: MultiValue<Option | null>): void => {
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
            options={options}
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

export { MultiDropdown };
