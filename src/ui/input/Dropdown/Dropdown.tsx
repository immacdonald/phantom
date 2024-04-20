import React, { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import style from './Dropdown.module.scss';

interface DropdownProps {
    options: DropdownValue[];
    isMulti?: boolean;
    isClearable?: boolean;
    defaultValue?: DropdownValue;
    placeholder?: string;
    disabled?: boolean;
    onChange?: (selected: DropdownValue | null) => void;
}

export type DropdownValue = string | number | boolean | null;

type DropdownOption = {
    value: DropdownValue;
    label: string;
};

const makeOptions = (options: DropdownValue[]) => {
    return options.map((option) => ({ value: option, label: `${option}` }));
};

const Dropdown: React.FC<DropdownProps> = ({ options = [], isClearable = true, defaultValue = null, placeholder, disabled = false, onChange = () => {} }) => {
    const formattedOptions: DropdownOption[] = makeOptions(options);

    const [internalValue, setInternalValue] = useState<DropdownOption | null>();

    const valueToOption = (input: DropdownValue | null): DropdownOption | null => {
        return input ? formattedOptions.find((option) => option.value === input) || null : null;
    };

    useEffect(() => {
        setInternalValue(valueToOption(defaultValue));
    }, [defaultValue]);

    const handleChange = (selected: DropdownOption | null) => {
        let selectedValue: DropdownValue | null = null;

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

interface BooleanDropdownProps {
    isMulti?: boolean;
    isClearable?: boolean;
    defaultValue?: DropdownValue;
    placeholder?: string;
    disabled?: boolean;
    labels?: [string, string];
    onChange?: (selected: DropdownValue | null) => void;
}

const BooleanDropdown: React.FC<BooleanDropdownProps> = ({ isClearable = true, defaultValue = null, placeholder, disabled = false, labels = ['True', 'False'], onChange = () => {} }) => {
    const options = [
        { value: true, label: labels[0] },
        { value: false, label: labels[1] }
    ];
    const [internalValue, setInternalValue] = useState<DropdownOption | null>();

    const valueToOption = (input: DropdownValue | null): DropdownOption | null => {
        return input != null ? options.find((option) => option.value === input || `${option.value}` == `${input}`) || null : null;
    };

    useEffect(() => {
        setInternalValue(valueToOption(defaultValue));
    }, [defaultValue]);

    const handleChange = (selected: DropdownOption | null) => {
        let selectedValue: DropdownValue | null = null;

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

interface MultiDropdownProps {
    options: DropdownValue[];
    isClearable?: boolean;
    defaultValue?: DropdownValue[];
    value?: DropdownValue[];
    placeholder?: string;
    disabled?: boolean;
    onChange?: (selected: DropdownValue[]) => void;
}

const MultiDropdown: React.FC<MultiDropdownProps> = ({ options = [], isClearable = true, defaultValue = null, placeholder, disabled = false, onChange = () => {} }) => {
    const formattedOptions: DropdownOption[] = makeOptions(options);

    const [internalValue, setInternalValue] = useState<DropdownOption[] | null>();

    const valueToOption = (input: DropdownValue[] | null): DropdownOption[] | null => {
        return input ? formattedOptions.filter((option) => input.includes(option.value)) : null;
    };

    useEffect(() => {
        setInternalValue(valueToOption(defaultValue));
    }, [defaultValue]);

    const handleChange = (selected: MultiValue<DropdownOption | null>) => {
        let selectedValue: (DropdownValue | null)[] = [];

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

export { Dropdown, MultiDropdown, BooleanDropdown };
