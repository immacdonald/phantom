import clsx from 'clsx';
import style from './StyledImage.module.scss';

interface StyledImageProps {
    image: string;
    alt: string;
    border?: boolean;
    round?: boolean;
    maxWidth?: number;
    maxHeight?: string;
    caption?: string | React.ReactNode;
}

const StyledImage: React.FC<StyledImageProps> = ({ image, alt, border = false, round = false, maxWidth, maxHeight, caption }) => {
    const imageStyle = clsx(style.image, {
        [style.border]: border,
        [style.round]: round
    });

    const properties = { '--v-max-width': maxWidth ? `${maxWidth}px` : undefined, '--v-max-height': maxHeight } as React.CSSProperties;

    return (
        <figure className={style.figure} style={properties}>
            <img src={image} className={imageStyle} alt={alt} />
            {caption && <figcaption className={style.caption}>{caption}</figcaption>}
        </figure>
    );
};

export { StyledImage };
