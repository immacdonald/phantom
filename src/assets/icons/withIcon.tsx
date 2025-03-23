import type { IconProps } from '@components';
import type { FC, ReactElement } from 'react';
import { Icon } from '@components';

const withVectorIcon = (WrappedSVG: FC) => {
    return function WithIcon(props: IconProps): ReactElement {
        return <Icon {...props} icon={<WrappedSVG />} />;
    };
};

const withImageIcon = (wrappedImage: string) => {
    return function WithIcon(props: IconProps): ReactElement {
        return <Icon {...props} icon={<img src={wrappedImage} alt="Icon" />} />;
    };
};

export { withImageIcon, withVectorIcon };
