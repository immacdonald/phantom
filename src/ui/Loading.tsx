import React from 'react';
import style from './Loading.module.scss';

interface LoadingProps {
    size?: number;
    thickness?: number;
    width?: string;
    height?: string;
    minHeight?: string;
    color?: string;
    secondaryColor?: string;
}

const Loading: React.FC<LoadingProps> = ({
    size = 64,
    thickness = 8,
    width = '100%',
    height = '100%',
    minHeight = 'var(--v-size)',
    color = 'var(--c-primary)',
    secondaryColor = 'var(--c-primary)'
}) => {
    const properties = {
        '--v-size': `${size}px`,
        '--v-thickness': `${thickness}px`,
        '--v-width': width,
        '--v-height': height,
        '--v-min-height': minHeight,
        '--v-color': color,
        '--v-secondary-color': secondaryColor
    } as React.CSSProperties;
    return (
        <div className={style.loader} style={properties}>
            <div />
            <div />
            <div />
        </div>
    );
};

export default Loading;
