import { CommonComponentProps } from '@types';
import clsx from 'clsx';
import { CSSProperties, FC, ReactNode } from 'react';
import { withCommonProps } from '@components/hoc';
import styles from './StyledImage.module.scss';

interface StyledImageProps extends CommonComponentProps {
    image: string;
    alt: string;
    border?: boolean;
    round?: boolean;
    fit?: boolean;
    maxWidth?: number;
    maxHeight?: string;
    caption?: string | ReactNode;
}

const StyledImageComponent: FC<StyledImageProps> = ({ image, alt, border, round, fit, maxWidth, maxHeight, caption, ...rest }) => {
    const imageStyle = clsx(styles.image, {
        [styles.border]: border,
        [styles.round]: round,
        [styles.fit]: fit
    });

    const properties = { '--v-max-width': maxWidth ? `${maxWidth}px` : undefined, '--v-max-height': maxHeight } as CSSProperties;

    return (
        <figure className={styles.figure} style={properties} {...rest}>
            <img src={image} className={imageStyle} alt={alt} />
            {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
        </figure>
    );
};

const StyledImage = withCommonProps(StyledImageComponent);

export { StyledImage };
