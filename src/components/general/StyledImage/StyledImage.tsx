import { CommonComponentProps } from '@types';
import { CSSProperties, FC, forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
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

const StyledImage: FC<StyledImageProps> = forwardRef<HTMLElement, StyledImageProps>(({ image, alt, border, round, fit, maxWidth, maxHeight, caption, ...props }, ref) => {
    const imageStyle = clsx(styles.image, {
        [styles.border]: border,
        [styles.round]: round,
        [styles.fit]: fit
    });

    const properties = { '--v-max-width': maxWidth ? `${maxWidth}px` : undefined, '--v-max-height': maxHeight } as CSSProperties;

    return (
        <figure className={styles.figure} style={properties} ref={ref} {...props}>
            <img src={image} className={imageStyle} alt={alt} />
            {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
        </figure>
    );
});

export { StyledImage };
