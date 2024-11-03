import { CommonComponentProps, VisualContext } from '@types';
import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { useScrollDistance } from '@hooks';
import style from './DynamicHeader.module.scss';

interface DynamicHeader {
    inline?: boolean;
    pageSpace?: 'pad' | 'overlap';
    hasBackground?: boolean;
    context?: VisualContext;
}

interface DynamicHeaderSettings extends DynamicHeader {
    enabled: boolean;
    scrollDistance?: number;
}

interface BaseDynamicHeaderProps extends DynamicHeader {
    dynamicSettings?: DynamicHeaderSettings;
}

interface DynamicHeaderProps extends BaseDynamicHeaderProps, CommonComponentProps {
    children: ReactNode;
}

const DEFAULT_SCROLL_DISTANCE = 400;

const DynamicHeader: FC<DynamicHeaderProps> = ({ inline = false, pageSpace, hasBackground, context, dynamicSettings, children, className, ...rest }) => {
    const scroll = useScrollDistance();
    const scrolled = dynamicSettings?.enabled && scroll > (dynamicSettings!.scrollDistance || DEFAULT_SCROLL_DISTANCE);

    const currentSettings: DynamicHeader = {
        inline: scrolled ? dynamicSettings!.inline : inline,
        pageSpace: scrolled ? dynamicSettings!.pageSpace : pageSpace,
        hasBackground: scrolled ? dynamicSettings!.hasBackground : hasBackground,
        context: scrolled ? dynamicSettings!.context : context
    };

    const headerClasses = clsx(
        style.header,
        {
            [style.inline]: currentSettings.inline,
            [style.fixed]: !currentSettings.inline,
            [style.overlapPage]: currentSettings.pageSpace == 'overlap',
            [style.padPage]: currentSettings.pageSpace == 'pad',
            [style.background]: currentSettings.hasBackground
        },
        className
    );

    return (
        <header className={headerClasses} data-context={currentSettings.context} {...rest}>
            {children}
        </header>
    );
};

export type { BaseDynamicHeaderProps as DynamicHeaderProps };
export { DynamicHeader };
