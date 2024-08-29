import clsx from 'clsx';
import { CSSProperties, FC, ReactNode } from 'react';
import style from './StyledImage.module.scss';

interface StyledImageProps {
    image: string;
    alt: string;
    border?: boolean;
    round?: boolean;
    fit?: boolean;
    maxWidth?: number;
    maxHeight?: string;
    caption?: string | ReactNode;
}

const StyledImage: FC<StyledImageProps> = ({ image, alt, border = false, round = false, fit = false, maxWidth, maxHeight, caption }) => {
    const imageStyle = clsx(style.image, {
        [style.border]: border,
        [style.round]: round,
        [style.fit]: fit
    });

    const properties = { '--v-max-width': maxWidth ? `${maxWidth}px` : undefined, '--v-max-height': maxHeight } as CSSProperties;

    return (
        <figure className={style.figure} style={properties}>
            <img src={image} className={imageStyle} alt={alt} />
            {caption && <figcaption className={style.caption}>{caption}</figcaption>}
        </figure>
    );
};

export { StyledImage };
