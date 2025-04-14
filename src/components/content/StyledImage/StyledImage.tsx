import type { CommonComponentProps } from '@types';
import type { CSSProperties, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { forwardRef } from 'react';
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
const StyledImage = forwardRef<HTMLElement, StyledImageProps>(({ image, alt, border, round, fit, maxWidth, maxHeight, caption, className, style, ...props }, ref) => {
    // Computes the class names based on props.
    const imageStyle = clsx(
        styles.image,
        {
            [styles.border]: border,
            [styles.round]: round,
            [styles.fit]: fit
        },
        className
    );

    // Applies max width and height as CSS variables.
    const properties = {
        '--image-max-width': maxWidth ? `${maxWidth}px` : undefined,
        '--image-max-height': maxHeight,
        ...style
    } as CSSProperties;

    return (
        <figure className={styles.figure} style={properties} ref={ref} {...props}>
            <img src={image} className={imageStyle} alt={alt} />
            {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
        </figure>
    );
}) as ForwardRefExoticComponent<StyledImageProps & RefAttributes<HTMLElement>>;

export { StyledImage };
