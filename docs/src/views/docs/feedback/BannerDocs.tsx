import type { FC } from 'react';
import { Button, pushError, pushSuccess } from 'phantom-library';
import { getComponentDoc } from '@utility';
import { ComponentDocs } from '../../../components/Layout/ComponentDocs';

const BannerDocs: FC = () => {
    const parsedDocs = getComponentDoc('Banner')!;

    return (
        <ComponentDocs {...parsedDocs}>
            <Button type="primary" context="positive" onClick={() => pushSuccess('Success notification')}>
                Push Success Notification
            </Button>
            <Button type="primary" context="critical" onClick={() => pushError('Failure notification')}>
                Push Failure Notification
            </Button>
        </ComponentDocs>
    );
};

export { BannerDocs };
