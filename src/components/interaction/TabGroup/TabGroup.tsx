import type { NullablePrimitive, Option } from '@types';
import { FC, ReactNode, useState } from 'react';
import { Button, Row, Segmented } from '@components';
import style from './TabGroup.module.scss';

export type Tab = {
    tab: ReactNode;
    label: string;
    disabled?: boolean;
};

interface TabGroupProps {
    tabs: Tab[];
    variant?: 'tabs' | 'segmented';
    containerClass?: string;
}

const TabGroup: FC<TabGroupProps> = ({ tabs, variant = 'tabs', containerClass }) => {
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
                                visual={selected ? 'filled' : 'filled'}
                                context={selected ? 'primary' : undefined}
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
            <div className={containerClass}>{tabs[selectedTab].tab}</div>
        </>
    );
};

export { TabGroup };
