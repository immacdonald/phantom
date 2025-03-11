import { CommonComponentProps } from '@types';
import { CSSProperties, FC, forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './StyledImage.module.scss';

interface StyledImageProps extends CommonComponentProps {
    /** The source URL of the image. */
    image: string;

    /** The alt text for the image, used for accessibility. */
    alt: string;

    /** Adds a border around the image. */
    border?: boolean;

    /** Rounds the corners of the image. */
    round?: boolean;

    /** Ensures the image fits within its container while preserving aspect ratio. */
    fit?: boolean;

    /** Sets a maximum width for the image in pixels. */
    maxWidth?: number;

    /** Sets a maximum height for the image using a CSS-compatible string value. */
    maxHeight?: string;

    /** An optional caption displayed below the image. */
    caption?: string | ReactNode;
}

/** A styled image component supporting borders, rounded corners, sizing constraints, and captions. */
const StyledImage: FC<StyledImageProps> = forwardRef<HTMLElement, StyledImageProps>(({ image, alt, border, round, fit, maxWidth, maxHeight, caption, ...props }, ref) => {
    // Computes the class names based on props.
    const imageStyle = clsx(styles.image, {
        [styles.border]: border,
        [styles.round]: round,
        [styles.fit]: fit
    });

    // Applies max width and height as CSS variables.
    const properties = {
        '--v-max-width': maxWidth ? `${maxWidth}px` : undefined,
        '--v-max-height': maxHeight
    } as CSSProperties;

    return (
        <figure className={styles.figure} style={properties} ref={ref} {...props}>
            <img src={image} className={imageStyle} alt={alt} />
            {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
        </figure>
    );
});

export { StyledImage };
