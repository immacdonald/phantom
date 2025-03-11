import { FC, Fragment, ReactNode, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { Button, DynamicHeader, Row, StyledFooter, Typography, StyledLink, useResponsiveContext, MenuIcon, designTokens, Accordion, GitHubIcon, Divider, ChevronIcon } from 'phantom-library';
import styles from './Layout.module.scss';

interface SidebarContent {
    title: string;
    navigation: {
        title: string;
        link: string;
        done?: boolean;
    }[];
}

const sidebar: SidebarContent[] = [
    {
        title: 'Content',
        navigation: [
            { title: 'Accordion', link: '/accordion' },
            { title: 'Anchor', link: '/anchor' },
            { title: 'Divider', link: '/divider' },
            { title: 'Heading', link: '/heading' },
            { title: 'HoverMark', link: '/hover-mark' },
            { title: 'Icon', link: '/icon', done: false },
            { title: 'Popover', link: '/popover' },
            { title: 'StyledImage', link: '/styled-image' },
            { title: 'Typography', link: '/typography' }
        ]
    },
    {
        title: 'Feedback',
        navigation: [
            { title: 'Banner', link: '/banner' },
            { title: 'Loading', link: '/loading', done: false },
            { title: 'Modal', link: '/modal' }
        ]
    },
    {
        title: 'Input',
        navigation: [
            { title: 'Button', link: '/button' },
            { title: 'Dropdown', link: '/dropdown', done: false },
            { title: 'FileUploadPortal', link: '/file-upload-portal' },
            { title: 'FormInput', link: '/form-input' },
            { title: 'Segmented', link: '/segmented' },
            { title: 'Switch', link: '/switch' },
            { title: 'Toggle', link: '/toggle' }
        ]
    },
    {
        title: 'Layout',
        navigation: [
            { title: 'DynamicHeader', link: '/dynamic-header' },
            { title: 'Flex', link: '/flex' },
            { title: 'Page', link: '/page', done: false },
            { title: 'Section', link: '/section' },
            { title: 'Split', link: '/split', done: false },
            { title: 'StyledApp', link: '/styled-app' },
            { title: 'StyledFooter', link: '/styled-footer' }
        ]
    },
    {
        title: 'Navigation',
        navigation: [
            { title: 'StyledLink', link: '/styled-link' },
            { title: 'TabGroup', link: '/tab-group' }
        ]
    }
];

interface LayoutProps {
    children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const { atBreakpoint, windowSize } = useResponsiveContext();
    const isMobile = useMemo(() => atBreakpoint('sm'), [windowSize.width]);
    const [sidebarActive, setSidebarActive] = useState<boolean>(false);

    useEffect(() => {
        setSidebarActive(false);
    }, [isMobile]);

    const SidebarContent = useMemo(
        () => (
            <aside className={clsx(styles.aside, { [styles.mobile]: isMobile })} data-toggled={sidebarActive}>
                <Button align="start" Icon={ChevronIcon} full link="/">
                    About
                </Button>
                <Accordion label="Components" borderless compact iconLeft labelAlignment="start" defaultState={true} innerClassName={styles.category}>
                    {sidebar.map((category: SidebarContent) => (
                        <Fragment key={category.title}>
                            {category.navigation.map((content) => (
                                <Button variant="text" full align="start" link={`/components${content.link}`} key={content.title} disabled={content.done === false} size="small">
                                    {content.title}
                                </Button>
                            ))}
                            <Divider />
                        </Fragment>
                    ))}
                </Accordion>
            </aside>
        ),
        [isMobile, sidebarActive]
    );

    return (
        <div style={{ width: '100%' }}>
            <DynamicHeader hasBackground pageSpace="pad" style={{ borderBottom: designTokens.border.light, paddingInline: designTokens.space.lg }}>
                <Row align="start" gap={designTokens.space.md}>
                    {isMobile && <Button Icon={MenuIcon} onClick={() => setSidebarActive(!sidebarActive)} />}
                    <StyledLink to="/" inherit>
                        <b>Phantom Library</b>
                    </StyledLink>
                    <StyledLink to="/" inherit style={{ marginLeft: 'auto' }}>
                        About
                    </StyledLink>
                    <StyledLink to="https://github.com/immacdonald/phantom" inherit external>
                        <GitHubIcon inline />
                    </StyledLink>
                </Row>
            </DynamicHeader>
            <Row verticalAlign="start">
                {SidebarContent}
                <main className={styles.main}>
                    <article>{children}</article>
                    <StyledFooter theme="dark">
                        <Typography.Paragraph>The Phantom UI Design & Component Library</Typography.Paragraph>
                        <Typography.Paragraph>Created with &#x2665; by Ian MacDonald</Typography.Paragraph>
                    </StyledFooter>
                </main>
            </Row>
        </div>
    );
};

export { Layout };
