import type { CommonComponentProps } from '@types';
import type { FC, HTMLInputTypeAttribute, ReactNode } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';
import { Typography } from '@components/content';
import style from './FormInput.module.scss';

interface InputProps extends CommonComponentProps<HTMLInputElement> {
    /** The name of the input field, used for form submission. */
    name: string;

    /** The type of input field. */
    type?: HTMLInputTypeAttribute;

    /** An optional label displayed above the input field. */
    label?: string | ReactNode;

    /** Placeholder text shown inside the input field. */
    placeholder?: string;

    /** An error message displayed below the input field. */
    error?: string;

    /** Additional class names for the fieldset wrapper. */
    fieldClass?: string;
}

/** A customizable form input component with optional labels, validation, and error messaging. */
const FormInput: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(({ name, type = 'text', label, error, id, fieldClass, ...props }, ref) => {
    const inputId = id || name;

    return (
        <fieldset className={clsx(style.input, fieldClass)}>
            {label && <label htmlFor={inputId}>{label}</label>}
            <input id={inputId} name={name} type={type} aria-invalid={!!error} aria-describedby={error ? `${inputId}-error` : undefined} ref={ref} {...props} />
            {error && (
                <Typography.Text id={`${inputId}-error`} role="alert">
                    {error}
                </Typography.Text>
            )}
        </fieldset>
    );
});

export { FormInput };
