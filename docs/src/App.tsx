import 'phantom-library/styles';
import 'phantom-library/tokens';
import { FC } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { StyledApp } from 'phantom-library';
import { Layout } from '@components/Layout';
import {
    AccordionDocs,
    AnchorDocs,
    BannerDocs,
    ButtonDocs,
    ColumnDocs,
    DividerDocs,
    DynamicHeaderDocs,
    FileUploadPortalDocs,
    FlexDocs,
    FormInputDocs,
    HeadingDocs,
    HoverMarkDocs,
    ModalDocs,
    PopoverDocs,
    RowDocs,
    SectionDocs,
    SegmentedDocs,
    StyledImageDocs,
    StyledLinkDocs,
    SwitchDocs,
    TabGroupDocs,
    ToggleDocs,
    TypographyDocs
} from './views/docs';
import './index.module.scss';
import { StyledFooterDocs } from './views/docs/layout/StyledFooterDocs';
import { ErrorView } from './views/ErrorView';
import { Home } from './views/Home';

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: (
                <StyledApp banners modals anchors>
                    <Outlet />
                </StyledApp>
            ),
            children: [
                {
                    path: '/',
                    element: <Home />
                },
                {
                    path: '/components',
                    element: (
                        <Layout>
                            <Outlet />
                        </Layout>
                    ),
                    children: [
                        // Content
                        { path: 'accordion', element: <AccordionDocs /> },
                        { path: 'anchor', element: <AnchorDocs /> },
                        { path: 'divider', element: <DividerDocs /> },
                        { path: 'heading', element: <HeadingDocs /> },
                        { path: 'hover-mark', element: <HoverMarkDocs /> },
                        { path: 'popover', element: <PopoverDocs /> },
                        { path: 'styled-image', element: <StyledImageDocs /> },
                        { path: 'typography', element: <TypographyDocs /> },
                        // Feedback
                        { path: 'banner', element: <BannerDocs /> },
                        { path: 'modal', element: <ModalDocs /> },
                        // Input
                        { path: 'button', element: <ButtonDocs /> },
                        { path: 'file-upload-portal', element: <FileUploadPortalDocs /> },
                        { path: 'form-input', element: <FormInputDocs /> },
                        { path: 'segmented', element: <SegmentedDocs /> },
                        { path: 'switch', element: <SwitchDocs /> },
                        { path: 'toggle', element: <ToggleDocs /> },
                        // Layout
                        { path: 'column', element: <ColumnDocs /> },
                        { path: 'dynamic-header', element: <DynamicHeaderDocs /> },
                        { path: 'flex', element: <FlexDocs /> },
                        { path: 'row', element: <RowDocs /> },
                        { path: 'section', element: <SectionDocs /> },
                        { path: 'styled-footer', element: <StyledFooterDocs /> },
                        // Navigation
                        { path: 'styled-link', element: <StyledLinkDocs /> },
                        { path: 'tab-group', element: <TabGroupDocs /> }
                    ]
                },
                { path: '*', element: <ErrorView /> }
            ]
        }
    ],
    {
        basename: import.meta.env.BASE_URL
    }
);

const App: FC = () => {
    return <RouterProvider router={router} />;
};

export { App };
