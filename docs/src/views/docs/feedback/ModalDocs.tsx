import type { FC } from 'react';
import { Button, setModal, Modal, Typography } from 'phantom-library';
import { ComponentDocs } from '@components/Layout/ComponentDocs';
import { getComponentDoc } from '@utility';

const ModalDocs: FC = () => {
    const parsedDocs = getComponentDoc('Modal')!;

    return (
        <ComponentDocs {...parsedDocs}>
            <Button
                onClick={() =>
                    setModal(
                        <Modal header="Default Modal">
                            <Typography.Paragraph>This is a default modal.</Typography.Paragraph>
                        </Modal>
                    )
                }
            >
                Open Default Modal
            </Button>
            <Button
                onClick={() =>
                    setModal(
                        <Modal header="Information Modal" reject={null}>
                            <Typography.Paragraph>This is an information modal.</Typography.Paragraph>
                        </Modal>
                    )
                }
            >
                Open Information Modal
            </Button>
        </ComponentDocs>
    );
};

export { ModalDocs };
