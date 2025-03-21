import { ReactNode } from 'react';
import {
    AccordionDocs,
    AnchorDocs,
    BannerDocs,
    ButtonDocs,
    CalloutDocs,
    DividerDocs,
    DropdownDocs,
    DynamicHeaderDocs,
    FileUploadPortalDocs,
    FlexDocs,
    FormInputDocs,
    HeadingDocs,
    HoverMarkDocs,
    IconDocs,
    LoadingDocs,
    ModalDocs,
    MultiDropdownDocs,
    PageDocs,
    PopoverDocs,
    SectionDocs,
    SegmentedDocs,
    SplitDocs,
    StyledAppDocs,
    StyledFooterDocs,
    StyledImageDocs,
    StyledLinkDocs,
    SwitchDocs,
    TabGroupDocs,
    ToggleDocs,
    TypographyDocs
} from '@views';

interface RouteContent {
    title: string;
    navigation: {
        title: string;
        link: string;
        docs?: ReactNode;
    }[];
}

const routes: RouteContent[] = [
    {
        title: 'Content',
        navigation: [
            { title: 'Accordion', link: '/accordion', docs: <AccordionDocs /> },
            { title: 'Anchor', link: '/anchor', docs: <AnchorDocs /> },
            { title: 'Callout', link: '/callout', docs: <CalloutDocs /> },
            { title: 'Divider', link: '/divider', docs: <DividerDocs /> },
            { title: 'Heading', link: '/heading', docs: <HeadingDocs /> },
            { title: 'HoverMark', link: '/hover-mark', docs: <HoverMarkDocs /> },
            { title: 'Icon', link: '/icon', docs: <IconDocs /> },
            { title: 'Popover', link: '/popover', docs: <PopoverDocs /> },
            { title: 'StyledImage', link: '/styled-image', docs: <StyledImageDocs /> },
            { title: 'Typography', link: '/typography', docs: <TypographyDocs /> }
        ]
    },
    {
        title: 'Feedback',
        navigation: [
            { title: 'Banner', link: '/banner', docs: <BannerDocs /> },
            { title: 'Loading', link: '/loading', docs: <LoadingDocs /> },
            { title: 'Modal', link: '/modal', docs: <ModalDocs /> }
        ]
    },
    {
        title: 'Input',
        navigation: [
            { title: 'Button', link: '/button', docs: <ButtonDocs /> },
            { title: 'Dropdown', link: '/dropdown', docs: <DropdownDocs /> },
            { title: 'FileUploadPortal', link: '/file-upload-portal', docs: <FileUploadPortalDocs /> },
            { title: 'FormInput', link: '/form-input', docs: <FormInputDocs /> },
            { title: 'MultiDropdown', link: '/multi-dropdown', docs: <MultiDropdownDocs /> },
            { title: 'Segmented', link: '/segmented', docs: <SegmentedDocs /> },
            { title: 'Switch', link: '/switch', docs: <SwitchDocs /> },
            { title: 'Toggle', link: '/toggle', docs: <ToggleDocs /> }
        ]
    },
    {
        title: 'Layout',
        navigation: [
            { title: 'DynamicHeader', link: '/dynamic-header', docs: <DynamicHeaderDocs /> },
            { title: 'Flex', link: '/flex', docs: <FlexDocs /> },
            { title: 'Page', link: '/page', docs: <PageDocs /> },
            { title: 'Section', link: '/section', docs: <SectionDocs /> },
            { title: 'Split', link: '/split', docs: <SplitDocs /> },
            { title: 'StyledApp', link: '/styled-app', docs: <StyledAppDocs /> },
            { title: 'StyledFooter', link: '/styled-footer', docs: <StyledFooterDocs /> }
        ]
    },
    {
        title: 'Navigation',
        navigation: [
            { title: 'StyledLink', link: '/styled-link', docs: <StyledLinkDocs /> },
            { title: 'TabGroup', link: '/tab-group', docs: <TabGroupDocs /> }
        ]
    }
];

export { routes };
