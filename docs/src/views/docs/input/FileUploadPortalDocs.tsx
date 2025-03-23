import type { FC } from 'react';
import { FileUploadPortal } from 'phantom-library';
import { ComponentDocs } from '@components/Layout/ComponentDocs';
import { getComponentDoc } from '@utility';

const FileUploadPortalDocs: FC = () => {
    const parsedDocs = getComponentDoc('FileUploadPortal')!;

    return (
        <ComponentDocs {...parsedDocs}>
            <FileUploadPortal maxFiles={3} submit={(files) => console.log('Submitted files:', files)} />
        </ComponentDocs>
    );
};

export { FileUploadPortalDocs };
