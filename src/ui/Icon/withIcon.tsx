import { Icon, IconProps } from './Icon';

const withVectorIcon = (WrappedSVG: React.FC) => {
    return function WithIcon(props: IconProps) {
        return <Icon {...props} icon={<WrappedSVG />} />;
    };
};

const withImageIcon = (wrappedImage: string) => {
    return function WithIcon(props: IconProps) {
        return <Icon {...props} icon={<img src={wrappedImage} />} />;
    };
};

export { withVectorIcon, withImageIcon };
