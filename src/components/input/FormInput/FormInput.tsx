import { FieldError } from 'react-hook-form';
import { FC, HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode } from 'react';
import style from './FormInput.module.scss';

type InputProps = {
    name: string;
    type?: HTMLInputTypeAttribute;
    register: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    validationSchema?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    label?: string | ReactNode;
    error?: FieldError;
    id?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<InputProps> = ({ name, type = 'text', register, validationSchema, label, error, id, ...rest }) => {
    const Input = type == 'textarea' ? 'textarea' : 'input';
    return (
        <div className={style.input}>
            <div className={style.inputRow}>
                <Input id={id || name} name={name} type={type} {...register(name, validationSchema)} aria-invalid={error ? 'true' : 'false'} {...rest} />
                {label && <label htmlFor={id || name}>{label}</label>}
            </div>
            {error && error.type == 'required' && (
                <p role="alert" className="error">
                    {error.message || 'Required'}
                </p>
            )}
            {error && error.type != 'required' && (
                <p role="alert" className="error">
                    {error.message || 'Invalid value'}
                </p>
            )}
        </div>
    );
};

export { FormInput };
