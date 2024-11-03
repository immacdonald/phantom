import { CommonComponentProps } from '@types';
import { FC, forwardRef, HTMLInputTypeAttribute, ReactNode } from 'react';
import { Typography } from '@components/general';
import style from './FormInput.module.scss';

interface InputProps extends CommonComponentProps<HTMLInputElement> {
    name: string;
    type?: HTMLInputTypeAttribute;
    label?: string | ReactNode;
    placeholder?: string;
    error?: string;
    register?: unknown;
    validationSchema?: unknown;
}

const FormInput: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(({ name, type = 'text', label, error, id, ...props }, ref) => {
    return (
        <fieldset className={style.input}>
            {label && <label htmlFor={id || name}>{label}</label>}
            <input id={id || name} name={name} type={type} aria-invalid={error ? 'true' : 'false'} ref={ref} {...props} />
            {error && (
                <Typography.Text role="alert" className="error">
                    {error}
                </Typography.Text>
            )}
        </fieldset>
    );
});

export { FormInput };
