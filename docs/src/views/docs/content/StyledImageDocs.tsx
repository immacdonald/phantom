import { FC } from 'react';
import { AstrophotographyImage } from '@assets';
import { StyledImage, TabGroup } from 'phantom-library';
import { ComponentDocs } from '@components/Layout';
import { getComponentDoc } from '@utility';

const StyledImageDocs: FC = () => {
    const parsedDocs = getComponentDoc('StyledImage')!;

    return (
        <ComponentDocs {...parsedDocs}>
            <TabGroup
                tabs={[
                    {
                        label: 'Caption',
                        tab: <StyledImage image={AstrophotographyImage} alt="Sample Fitted Image" caption="This is a caption for the image." />
                    },
                    {
                        label: 'Rounded',
                        tab: <StyledImage image={AstrophotographyImage} alt="Sample Image with Border and Rounded Corners" round />
                    },
                    {
                        label: 'Max Width',
                        tab: <StyledImage image={AstrophotographyImage} alt="Sample Image with Max Width" maxWidth={300} />
                    }
                ]}
                variant="segmented"
            />
        </ComponentDocs>
    );
};

export { StyledImageDocs };
