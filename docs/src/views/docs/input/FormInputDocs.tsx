import type { FC } from 'react';
import { FormInput } from 'phantom-library';
import { ComponentDocs } from '@components/Layout/ComponentDocs';
import { getComponentDoc } from '@utility';

const FormInputDocs: FC = () => {
    const parsedDocs = getComponentDoc('FormInput')!;

    return (
        <ComponentDocs {...parsedDocs}>
            <FormInput name="username" label="Text Input" />
            <FormInput name="age" type="number" label="Number Input" />
            <FormInput name="email" label="Input with Error" error="Invalid input" />
        </ComponentDocs>
    );
};

export { FormInputDocs };
