## Expressely: A Comprehensive Article Platform 📖
About:
Expressely is a dynamic web platform tailored for article enthusiasts. Whether you're an avid reader or an aspiring writer, Expressely caters to all.

1. Features:

- 📑 Read and Rate: Browse through a wide array of articles. Dive deep into the content and rate them based on your insights.

- ✍️ Publish and Comment: Got something to share? Craft your article and publish it to our platform. Engage with other users through meaningful comments.

- 🔍 Customized Sorting: Find articles based on different sorting options, ensuring you always read what you love.

2. 🚀 Roles & Responsibilities:

- User: Enjoy reading, rating, commenting, and even publishing articles. Stay updated with your article viewing history and customize your feed based on your profile preferences.

- Admin: Possess all privileges of a user with added responsibilities. Approve articles published by users, elevate privileges by granting admin rights, and have an eagle's eye view on the platform's analytics concerning users, articles, and views.

## Front End

1. Feature-Sliced Design: Organized codebase following the feature-sliced design pattern for maintainability and scalability.
2. React + TypeScript: Developed using functional components and hooks with TypeScript for type safety.
3. State Management: Redux Toolkit, Redux Thunk and RTK Query for efficient data fetching and caching.
4. Forms and Validation: Integrated with React Hook Form.
5. Lazy Loading: Implemented lazy loading for pages, modals, and reducers for optimized performance and quicker initial load times.
6. Theming and Localization: Includes multiple color themes and internalization support using i18n.
7. Virtualization: Implemented virtualization of articles list using Intersection Observer for efficient rendering.
8. Data Visualization: Charts made using Chart.js.
9. Webpack: Configured for optimizing, bundling, and managing assets and dependencies.
10. Storybook: Utilized for building UI components in isolation, documenting selected shared components
11. Testing: Utilized Jest with React Testing Library (RTL) for unit testing, and Cypress for end-to-end testing.
12. CI/CD: Automation with Continuous Integration/Continuous Deployment pipeline for every commit.

## Back End

1. NestJS: Node.js Framework with TypeScript integration for type safety and scalable development.
2. Deployment: Utilized NGINX as a reverse proxy and PM2 for process management during deployment.
3. JWT Authentication: Implemented JWT auth flow for user authentication.
4. Protected Routes: Restricted access routes for authenticated users.
5. Admin Guard: Implemented custom guards for admin-only access control.
6. PostgreSQL: Utilized as a relational database system to model relationships and interactions between different entities within the application.

## Start Project

```
npm install - installing dependencies for server and client folder
npm run start - starting client and server concurrently
npm run build - production build for server and client
```

----

## Scripts

Client: 
- `npm run start` - start client using webpack dev server
- `npm run build:prod` - build client in production mode
- `npm run build:dev` - build client in dev mode (not minimized)
- `npm run lint:ts` - Check .ts/.tsx files using ESLint
- `npm run lint:ts:fix` - Fix .ts/.tsx files using ESLint
- `npm run lint:scss` - Check .module.scss files using Stylelint
- `npm run lint:scss:fix` - Fix .module.scss files using Stylelint
- `npm run test:unit` - Start Jest/RTL unit tests
- `npm run storybook` - Start Storybook
- `npm run storybook:build` - Build Storybook
- `npm run generate:slice` - Script to generate FSD slices

----

## Project Architecture
The project is written in accordance with the Feature Sliced Design methodology.

Link to the documentation -[feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

## The project uses the i18next library for handling translations.

Translation files are stored in public/locales.

For a comfortable working experience, installing a plugin for WebStorm/VSCode is recommended.

i18next documentation - [https://react.i18next.com/](https://react.i18next.com/)

----

## Testing

The project utilizes  types of tests:

1. Regular unit tests with Jest - npm run test:unit
2. Component tests with React Testing Library - npm run test:unit
3. e2e testing with Cypress - npm run test:e2e

----

## Code Lint

Eslint is used to check TypeScript code and Stylelint is used to check style files.

Additionally, for strict control of the main architectural principles, eslint-plugin-ulbi-tv-plugin is used. It contains 3 rules:
1. path-checker - prohibits the use of absolute imports within a single module.
2. layer-imports - checks the correctness of layer usage from the FSD perspective (for instance, widgets can't be used in features and entities).
3. public-api-imports - allows imports from other modules only from the public API. It has auto-fix capability.

## Running the linters

1. npm run lint:ts - Checks ts files with the linter.
2. npm run lint:ts:fix - Fixes ts files with the linter.
3. npm run lint:scss - Checks scss files with the style linter.
4. npm run lint:scss:fix - Fixes scss files with the style linter.

----
## Storybook
Story cases are described for each shared component.

The file with story cases is created next to the component with the extension .stories.tsx.

You can run Storybook with the command:

- npm run storybook

## Project Configuration
Client Project is configured using Webpack, config file can be found in ./client/config/build

All configuration is stored in ./client/config:

- ./client/config/babel - for Babel
- ./client/config/build - for Webpack configuration
- ./client/config/jest - for test environment configuration
- ./client/config/storybook - for Storybook configuration

In the scripts folder, there are various scripts for refactoring, simplifying code writing, generating reports, and so on.
