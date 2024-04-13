import classNames from 'classnames';
import style from './StyledImage.module.scss';

interface StyledImageProps {
    image: string;
    border?: boolean;
    round?: boolean;
    maxWidth?: number;
}

const StyledImage: React.FC<StyledImageProps> = ({ image, border = false, round = false, maxWidth }) => {
    const imageStyle = classNames(style.image, {
        [style.border]: border,
        [style.round]: round
    });

    return (
        <div className={style.container}>
            <img src={image} className={imageStyle} style={ maxWidth ? { '--v-max-width': `${maxWidth}px` } as React.CSSProperties : undefined} />
        </div>
    );
};

export { StyledImage };
