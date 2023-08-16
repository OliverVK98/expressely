import { screen } from '@testing-library/react';
import AppRouter from './AppRouter';
import { componentRender } from '@/shared/config/tests/componentRender/componentRender';
import { getRouteAbout, getRouteProfile } from '@/shared/const/router';

describe('AppRouter.test', () => {
    test('Page needs to render', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAbout(),
        });

        const page = await screen.findByTestId('AboutPage');
        expect(page).toBeInTheDocument();
    });

    test('Page not found', async () => {
        componentRender(<AppRouter />, {
            route: '/fsdfasdfasdfasdsafasdf',
        });

        const page = await screen.findByTestId('NotFoundPage');
        expect(page).toBeInTheDocument();
    });

    test('User is authorized, tries to access profile page', async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile('1'),
            initialState: {
                user: {
                    _init: true,
                    authData: {},
                },
            },
        });

        const page = await screen.findByTestId('ProfilePage');
        expect(page).toBeInTheDocument();
    });
});
