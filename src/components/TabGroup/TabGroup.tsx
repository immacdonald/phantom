import { useState } from 'react';
import { Button, Row, Segmented } from '..';
import { NullablePrimitive, Option } from '../../types';
import style from './TabGroup.module.scss';

export type Tab = {
    tab: React.ReactNode;
    label: string;
    disabled?: boolean;
};

interface TabGroupProps {
    tabs: Tab[];
    variant?: 'tabs' | 'segmented';
    containerClass?: string;
}

const TabGroup: React.FC<TabGroupProps> = ({ tabs, variant = 'tabs', containerClass }) => {
    const [selectedTab, setTab] = useState<number>(0);

    return (
        <>
            {variant == 'segmented' ? (
                <Segmented
                    options={tabs.map((tab: Tab, index: number) => {
                        return { label: tab.label, value: index, disabled: tab.disabled } as Option;
                    })}
                    full
                    defaultValue={0}
                    onChange={(value: NullablePrimitive) => setTab(value as number)}
                    className={style.tabsSegmented}
                />
            ) : (
                <Row className={style.tabs}>
                    {tabs.map((tab: Tab, index: number) => {
                        const selected = index == selectedTab;
                        return (
                            <Button
                                key={index}
                                full
                                label={tab.label}
                                visual={selected ? 'filled' : 'outline'}
                                context={selected ? 'primary' : undefined}
                                onClick={() => setTab(index)}
                                className={style.tabButton}
                                disabled={tab.disabled}
                            />
                        );
                    })}
                </Row>
            )}
            <div className={containerClass}>{tabs[selectedTab].tab}</div>
        </>
    );
};

export { TabGroup };
