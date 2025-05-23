import type { Callback, NullablePrimitive, Option } from '@types';
import type { CSSProperties, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { forwardRef, useEffect, useState } from 'react';
import { Button, Row, Segmented } from '@components';
import { orUndefined } from '@utility';
import style from './TabGroup.module.scss';

export type Tab = {
    /** The content displayed when this tab is selected. */
    tab: ReactNode;

    /** The label displayed in the tab selection menu. */
    label: string;

    /** Disables the tab, preventing selection. */
    disabled?: boolean;
};

interface TabGroupProps {
    /** The list of available tabs. */
    tabs: Tab[];

    /** The index of the initially selected tab. */
    selectedIndex?: number;

    /** Callback function triggered when the selected tab changes. */
    onChange?: Callback<number>;

    /** Determines whether the visual style of the tabs. */
    variant?: 'tabs' | 'segmented';

    /** Compact display style. */
    compact?: boolean;

    /** Additional class name for the tab content container. */
    innerClassName?: string;

    /** Additional styles for the tab content container. */
    innerStyle?: CSSProperties;
}

/** A tab group component that allows users to switch between different content sections. */
const TabGroup = forwardRef<HTMLDivElement, TabGroupProps>(({ tabs, variant = 'tabs', selectedIndex, compact, innerClassName, innerStyle, onChange }, ref) => {
    const [selectedTab, setTab] = useState<number>(selectedIndex || 0);

    useEffect(() => {
        if (selectedIndex !== undefined) {
            setTab(selectedIndex);
        }
    }, [selectedIndex]);

    useEffect(() => {
        onChange?.(selectedTab);
    }, [selectedTab, onChange]);

    return (
        <>
            {variant === 'segmented' ? (
                <Segmented
                    options={tabs.map(
                        (tab: Tab, index: number) =>
                            ({
                                label: tab.label,
                                value: index,
                                disabled: tab.disabled
                            }) as Option
                    )}
                    full
                    value={selectedTab}
                    onChange={(value: NullablePrimitive) => setTab(value as number)}
                    className={style.tabsSegmented}
                    role="tablist"
                    compact={compact}
                    ref={ref}
                />
            ) : (
                <Row className={style.tabs} role="tablist" ref={ref}>
                    {tabs.map((tab: Tab, index: number) => {
                        const selected = index === selectedTab;
                        return (
                            <Button
                                type={orUndefined(selected, 'primary')}
                                variant={orUndefined(!selected, 'ghost')}
                                key={index}
                                full
                                onClick={() => setTab(index)}
                                className={style.tabButton}
                                disabled={tab.disabled}
                                role="tab"
                                aria-selected={selected}
                                aria-disabled={tab.disabled}
                                size={compact ? 'small' : 'regular'}
                            >
                                {tab.label}
                            </Button>
                        );
                    })}
                </Row>
            )}
            <div className={innerClassName} style={innerStyle} role="tabpanel">
                {tabs[selectedTab].tab}
            </div>
        </>
    );
}) as ForwardRefExoticComponent<TabGroupProps & RefAttributes<HTMLDivElement>>;

export { TabGroup };
