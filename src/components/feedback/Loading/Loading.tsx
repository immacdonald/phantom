import { CSSProperties, FC } from 'react';
import style from './Loading.module.scss';

interface LoadingProps {
    size?: number;
    thickness?: number;
    width?: string;
    height?: string;
    minHeight?: string;
    color?: string;
}

const Loading: FC<LoadingProps> = ({ size, thickness, width, height, minHeight, color }) => {
    const properties = {
        '--v-size': size ? `${size}px` : undefined,
        '--v-thickness': thickness ? `${thickness}px` : undefined,
        '--v-width': width,
        '--v-height': height,
        '--v-min-height': minHeight,
        '--v-color': color
    } as CSSProperties;

    return (
        <div className={style.loading} style={properties}>
            <div />
            <div />
            <div />
        </div>
    );
};

export { Loading };
