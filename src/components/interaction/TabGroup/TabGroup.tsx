import type { Callback, NullablePrimitive, Option } from '@types';
import { CSSProperties, FC, ReactNode, useEffect, useState } from 'react';
import { Button, Row, Segmented } from '@components';
import { orUndefined } from '@utility';
import style from './TabGroup.module.scss';

export type Tab = {
    tab: ReactNode;
    label: string;
    disabled?: boolean;
};

interface TabGroupProps {
    tabs: Tab[];
    selectedIndex?: number;
    onChange?: Callback<number>;
    variant?: 'tabs' | 'segmented';
    innerClassName?: string;
    innerStyle?: CSSProperties;
}

const TabGroup: FC<TabGroupProps> = ({ tabs, variant = 'tabs', selectedIndex, innerClassName, innerStyle, onChange = (): void => {} }) => {
    const [selectedTab, setTab] = useState<number>(selectedIndex || 0);

    useEffect(() => {
        if (selectedIndex) {
            setTab(selectedIndex);
        }
    }, [selectedIndex]);

    useEffect(() => {
        onChange(selectedTab);
    }, [selectedTab])

    return (
        <>
            {variant == 'segmented' ? (
                <Segmented
                    options={tabs.map((tab: Tab, index: number) => {
                        return { label: tab.label, value: index, disabled: tab.disabled } as Option;
                    })}
                    full
                    value={selectedTab}
                    onChange={(value: NullablePrimitive) => setTab(value as number)}
                    className={style.tabsSegmented}
                />
            ) : (
                <Row className={style.tabs}>
                    {tabs.map((tab: Tab, index: number) => {
                        const selected = index == selectedTab;
                        return (
                            <Button
                                type={orUndefined(selected, 'primary')}
                                variant={orUndefined(!selected, 'ghost')}
                                key={index}
                                full
                                onClick={() => setTab(index)}
                                className={style.tabButton}
                                disabled={tab.disabled}
                            >
                                {tab.label}
                            </Button>
                        );
                    })}
                </Row>
            )}
            <div className={innerClassName} style={innerStyle}>
                {tabs[selectedTab].tab}
            </div>
        </>
    );
};

export { TabGroup };
