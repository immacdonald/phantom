import type { CommonComponentProps } from '@types';
import type { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';
import { useScrollDistance } from '@hooks';
import style from './DynamicHeader.module.scss';

/** Defines the base properties for the dynamic header behavior. */
interface DynamicHeader {
    /** Determines if the header is inline (not fixed). */
    inline?: boolean;

    /** Specifies how the header interacts with page content (`pad` adds space, `overlap` overlays it). */
    pageSpace?: 'pad' | 'overlap';

    /** Determines whether the header has a background. */
    hasBackground?: boolean;
}

/** Extends `DynamicHeader` with additional dynamic behavior settings. */
interface DynamicHeaderSettings extends DynamicHeader {
    /** Enables the dynamic behavior of the header when scrolling. */
    enabled: boolean;

    /** The scroll distance (in pixels) required before dynamic settings take effect. */
    scrollDistance?: number;
}

/** Base properties for a dynamic header, allowing optional dynamic settings. */
interface BaseDynamicHeaderProps extends DynamicHeader {
    /** Configures how the header dynamically changes on scroll. */
    dynamicSettings?: DynamicHeaderSettings;
}

interface DynamicHeaderProps extends BaseDynamicHeaderProps, CommonComponentProps {
    /** The content inside the header. */
    children: ReactNode;
}

const DEFAULT_SCROLL_DISTANCE = 400;

/** A header component that dynamically adjusts its behavior based on scroll distance. */
const DynamicHeader = forwardRef<HTMLElement, DynamicHeaderProps>(({ inline = false, pageSpace, hasBackground, dynamicSettings, children, className, ...props }, ref) => {
    const scroll = useScrollDistance();
    const scrolled = dynamicSettings?.enabled && scroll > (dynamicSettings!.scrollDistance || DEFAULT_SCROLL_DISTANCE);

    const currentSettings: DynamicHeader = {
        inline: scrolled ? dynamicSettings!.inline : inline,
        pageSpace: scrolled ? dynamicSettings!.pageSpace : pageSpace,
        hasBackground: scrolled ? dynamicSettings!.hasBackground : hasBackground
    };

    const headerClasses = clsx(
        style.header,
        {
            [style.inline]: currentSettings.inline,
            [style.fixed]: !currentSettings.inline,
            [style.overlapPage]: currentSettings.pageSpace === 'overlap',
            [style.padPage]: currentSettings.pageSpace === 'pad',
            [style.background]: currentSettings.hasBackground
        },
        className
    );

    return (
        <header className={headerClasses} role="navigation" ref={ref} {...props}>
            {children}
        </header>
    );
}) as ForwardRefExoticComponent<DynamicHeaderProps & RefAttributes<HTMLDivElement>>;

export { DynamicHeader };
export type { BaseDynamicHeaderProps as DynamicHeaderProps };
