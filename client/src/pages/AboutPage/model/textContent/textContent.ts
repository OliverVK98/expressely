/* eslint-disable */
export interface AppDescriptionBlock {
    title: string;
    text?: string;
    paragraphs?: string[];
}

interface AppTechStackBlock {
    title: string;
    paragraphs: { bold: string; normal: string }[];
}

export const appDescription: AppDescriptionBlock[] = [
    {
        title: 'About Expressely',
        text: "Welcome to Expressely, where we celebrate the written word. As a bridge between writers and readers, we've created a space that nourishes creativity, promotes diverse voices, and fosters a community that values thoughtful expression and dialogue.",
    },
    {
        title: 'Our Mission',
        text: 'Expressely is on a mission to democratize writing. We believe in the transformative power of words, and we strive to create a platform where everyone, regardless of their background, can find their voice and share it with the world.',
    },
    {
        title: 'Why Expressely?',
        text: 'From aspiring writers to avid readers, Expressely is designed to inspire, challenge, and engage. With customizable features that cater to both the creation and consumption of content, we provide a unique experience that adapts to your interests and needs.',
    },
    {
        title: 'Features',
        paragraphs: [
            '• Diverse Voices: Explore content from writers around the world, across all genres, styles, and perspectives.',
            '• User-Friendly Editor: Our intuitive editor makes it easy for you to write, edit, and publish your work.',
            '• Personalized Experience: Set your preferences to discover content that resonates with you, from topics to writing styles.',
            '• Community Engagement: Connect with fellow writers and readers through comments, forums, and personalized feedback.',
            "• Sort Articles by Tag: With Expressely's tag-based sorting, you can navigate content that aligns with your interests.",
            '• Secure & Respectful: We uphold the highest standards of privacy and intellectual property rights, so your work is always protected.',
        ],
    },
    {
        title: 'Join the Expressely Community',
        paragraphs: [
            'Become a part of a vibrant community that celebrates creativity, growth, and collaboration.',
            'Whether you want to explore new ideas, share your own insights, or simply enjoy quality content from diverse voices, Expressely welcomes you.',
            'Join us today and start your journey of expression, discovery, and connection. Express yourself, Expressely.',
        ],
    },
];

export const appTechStack: AppTechStackBlock[] = [
    {
        title: 'Front End',
        paragraphs: [
            {
                bold: 'Feature-Sliced Design: ',
                normal: 'Organized codebase following the feature-sliced design pattern for maintainability and scalability.',
            },
            {
                bold: 'React + TypeScript: ',
                normal: 'Developed using functional components and hooks with TypeScript for type safety.',
            },
            {
                bold: 'State Management: ',
                normal: 'Redux Toolkit, Redux Thunk and RTK Query for efficient data fetching and caching.',
            },
            {
                bold: 'Forms and Validation: ',
                normal: 'Integrated with React Hook Form.',
            },
            {
                bold: 'Lazy Loading: ',
                normal: 'Implemented lazy loading for pages, modals, and reducers for optimized performance and quicker initial load times.',
            },
            {
                bold: 'Theming and Localization: ',
                normal: 'Includes multiple color themes and internalization support using i18n.',
            },
            {
                bold: 'Virtualization: ',
                normal: 'Implemented virtualization of articles list using Intersection Observer for efficient rendering.',
            },
            {
                bold: 'Data Visualization: ',
                normal: 'Charts made using Chart.js.',
            },
            {
                bold: 'Webpack: ',
                normal: 'Configured for optimizing, bundling, and managing assets and dependencies.',
            },
            {
                bold: 'Storybook: ',
                normal: 'Utilized for building UI components in isolation and documenting shared components.',
            },
            {
                bold: 'Testing: ',
                normal: 'Utilized Jest with React Testing Library (RTL) for unit testing, and Cypress for end-to-end testing.',
            },
            {
                bold: 'CI/CD: ',
                normal: 'Automation with Continuous Integration/Continuous Deployment pipeline for every commit.',
            },
        ],
    },
    {
        title: 'Back End',
        paragraphs: [
            {
                bold: 'NestJS: ',
                normal: 'NodeJS Framework with TypeScript integration for type safety and scalable development.',
            },
            {
                bold: 'JWT Authentication: ',
                normal: 'Implemented JWT auth flow for user authentication.',
            },
            {
                bold: 'Protected Routes: ',
                normal: 'Restricted access routes for authenticated users.',
            },
            {
                bold: 'Admin Guard: ',
                normal: 'Implemented custom guards for admin-only access control.',
            },
            {
                bold: 'PostgreSQL: ',
                normal: 'Utilized as a relational database system to model relationships and interactions between different entities within the application.',
            },
        ],
    },
];
