# Phantom Library
**React Components, Hooks, Utilities, and Design Systems**

The Phantom Library for React is a versatile and powerful package designed to streamline your workflow for any sort of web development project by providing a collection of cohesive, modular React components. Each component is built with flexibility in mind, allowing for easy customization using React props and modern CSS styling practices. Whether you're building a complex application or a simple interface, Phantom enables you to maintain consistency and efficiency across your projects by leveraging a well-structured design system.

### Installation
To setup and use `phantom-library` in any React project just follow three simple steps:
1. Install the library:
```bash
npm install phantom-library
```

2. Then, add a `<StyledApp>` component in the root of your component hierarchy. The StyledApp maintains the React contexts for responsive functionality as well as theming.
   
3. In your index or main file for the website, import the CSS styling from the library with `import 'phantom-library/styles'`.

All done!

### Components & More

#### Responsive Design

Through the use of CSS variables and React contexts which span the entire app, it is simple and easy to develop a consistent design style for your websites. Phantom also includes integration with SASS for easily utilizing design tokens for attributes such as colors and sizes.

#### General Components

Card
Heading
Icon
Styled
Image
Typography (Paragraph, Text)

#### Feedback Components

Banner
Loading
Modal

#### Input Components

Button
Dropdown
File Upload Portal
Form Input
Segmented
Switch
Toggle

#### Interaction Components

Accordion
Anchor
Hover Mark
Popover
Tab Group

#### Layout Components

Adaptive Grid
Column
Flex
Page
Row
Section
Simple Dynamic Header
Simple Footer
Split
Styled App

#### Hooks

useBackButton, useInterval, useIsVisible, useMousePosition, useOutsideClick, useQueryParams, useScrollDistance, useTheme, useWindowSize
