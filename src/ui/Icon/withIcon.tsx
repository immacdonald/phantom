import { Icon, IconProps } from "./Icon";

const withIcon = (WrappedComponent: React.FC) => {
    return function WithIcon(props: IconProps) {
        return <Icon {...props} icon={<WrappedComponent />} />;
    };
};

export { withIcon }