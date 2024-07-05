import React from 'react';
import { Icon, IconProps } from '@components';

const withVectorIcon = (WrappedSVG: React.FC) => {
    return function WithIcon(props: IconProps) {
        return <Icon {...props} icon={<WrappedSVG />} />;
    };
};

const withImageIcon = (wrappedImage: string) => {
    return function WithIcon(props: IconProps) {
        return <Icon {...props} icon={<img src={wrappedImage} alt="Icon" />} />;
    };
};

export { withImageIcon, withVectorIcon };
