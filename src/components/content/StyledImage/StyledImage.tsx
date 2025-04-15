import type { CommonComponentProps } from '@types';
import type { CSSProperties, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './StyledImage.module.scss';

const imageSizes = {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '980px',
    xl: '1280px'
};

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

    /** Sets a maximum width for the image. */
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | CSSProperties['width'];

    /** An optional caption displayed below the image. */
    caption?: string | ReactNode;
}

/** A styled image component supporting borders, rounded corners, sizing constraints, and captions. */
const StyledImage = forwardRef<HTMLElement, StyledImageProps>(({ image, alt, border, round, fit, maxWidth, caption, className, style, ...props }, ref) => {
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
    const properties: CSSProperties = maxWidth
        ? ({
              '--image-max-width': maxWidth in imageSizes ? imageSizes[maxWidth as keyof typeof imageSizes] : maxWidth
          } as CSSProperties)
        : {};

    return (
        <figure className={styles.figure} style={{ ...properties, ...style }} ref={ref} {...props}>
            <img src={image} className={imageStyle} alt={alt} />
            {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
        </figure>
    );
}) as ForwardRefExoticComponent<StyledImageProps & RefAttributes<HTMLElement>>;

export { StyledImage };
