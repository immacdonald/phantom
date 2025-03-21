import { FC, Fragment, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { PhantomLogo } from '@assets';
import clsx from 'clsx';
import {
    Button,
    DynamicHeader,
    Row,
    StyledFooter,
    Typography,
    StyledLink,
    useResponsiveContext,
    MenuIcon,
    tokens,
    Accordion,
    GitHubIcon,
    Divider,
    SunFilledIcon,
    MoonFilledIcon,
    CircleFilledIcon,
    useOutsideClick,
    useNoScroll
} from 'phantom-library';
import { routes } from '../../routes';
import styles from './Layout.module.scss';

interface LayoutProps {
    children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const { atBreakpoint, windowSize, theme, setTheme } = useResponsiveContext();
    const isMobile = useMemo(() => atBreakpoint('sm'), [windowSize.width]);
    const [sidebarActive, setSidebarActive] = useState<boolean>(false);
    const sidebarRef = useRef<HTMLElement>(null);
    const setNoScroll = useNoScroll();

    useOutsideClick(sidebarRef, () => {
        if (sidebarActive) {
            setSidebarActive(false);
        }
    });

    useEffect(() => {
        setSidebarActive(false);
    }, [isMobile]);

    useEffect(() => {
        setNoScroll(sidebarActive && isMobile);
    }, [sidebarActive, isMobile]);

    const SidebarContent = useMemo(
        () => (
            <aside className={clsx(styles.aside, { [styles.mobile]: isMobile })} data-toggled={sidebarActive} ref={sidebarRef}>
                <Button align="start" Icon={CircleFilledIcon} variant="ghost" full link="/">
                    About
                </Button>
                <Accordion label="Components" borderless compact iconLeft labelAlignment="start" defaultState={true} innerClassName={styles.category}>
                    {routes.map((category) => (
                        <Fragment key={category.title}>
                            {category.navigation.map((content) => (
                                <Button variant="text" full align="start" link={`/components${content.link}`} key={content.title} disabled={!content.docs} size="small">
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
            <DynamicHeader hasBackground pageSpace="pad" style={{ borderBottom: tokens.border.soft, paddingInline: tokens.space.lg }}>
                <Row align="start" gap={tokens.space.md}>
                    {isMobile && <Button Icon={MenuIcon} onClick={() => setSidebarActive(!sidebarActive)} />}
                    <StyledLink to="/" inherit>
                        <PhantomLogo />
                    </StyledLink>
                    <StyledLink to="/" inherit style={{ marginLeft: 'auto' }}>
                        About
                    </StyledLink>
                    <StyledLink to="https://github.com/immacdonald/phantom" inherit external>
                        <GitHubIcon />
                    </StyledLink>
                    <Button Icon={theme == 'light' ? SunFilledIcon : MoonFilledIcon} onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')} variant="text" />
                </Row>
            </DynamicHeader>
            <Row verticalAlign="start">
                {SidebarContent}
                <main className={styles.main}>
                    <article>{children}</article>
                    <StyledFooter theme="dark">
                        <Typography.Paragraph>The Phantom UI Library</Typography.Paragraph>
                        <Typography.Paragraph>
                            Created with &#x2665; by{' '}
                            <StyledLink to="https://ian-macdonald.com" inherit external>
                                Ian MacDonald
                            </StyledLink>
                        </Typography.Paragraph>
                    </StyledFooter>
                </main>
            </Row>
        </div>
    );
};

export { Layout };
