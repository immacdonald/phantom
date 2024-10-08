import { VisualContext } from '@types';
import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { useScrollDistance } from '@hooks';
import style from './SimpleDynamicHeader.module.scss';

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

interface DynamicHeaderProps extends DynamicHeader {
    dynamicSettings?: DynamicHeaderSettings;
}

interface SimpleDynamicHeaderProps extends DynamicHeaderProps {
    children: ReactNode;
}

const DEFAULT_SCROLL_DISTANCE = 400;

const SimpleDynamicHeader: FC<SimpleDynamicHeaderProps> = ({ inline = false, pageSpace, hasBackground, context, dynamicSettings, children }) => {
    const scroll = useScrollDistance();
    const scrolled = dynamicSettings?.enabled && scroll > (dynamicSettings!.scrollDistance || DEFAULT_SCROLL_DISTANCE);

    const currentSettings: DynamicHeader = {
        inline: scrolled ? dynamicSettings!.inline : inline,
        pageSpace: scrolled ? dynamicSettings!.pageSpace : pageSpace,
        hasBackground: scrolled ? dynamicSettings!.hasBackground : hasBackground,
        context: scrolled ? dynamicSettings!.context : context
    };

    const headerClasses = clsx(style.header, {
        [style.inline]: currentSettings.inline,
        [style.fixed]: !currentSettings.inline,
        [style.overlapPage]: currentSettings.pageSpace == 'overlap',
        [style.padPage]: currentSettings.pageSpace == 'pad',
        [style.background]: currentSettings.hasBackground
    });

    return (
        <header className={headerClasses} data-context={currentSettings.context}>
            {children}
        </header>
    );
};

export type { DynamicHeaderProps };
export { SimpleDynamicHeader };
