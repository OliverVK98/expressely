import { selectByTestId } from '../../helpers/selectByTestId';

describe('Routing', () => {
    describe('User is not authorized', () => {
        it('Visit Main Page', () => {
            cy.visit('/');
            cy.get(selectByTestId('MainPage')).should('exist');
        });

        it('Visit Profile Page', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestId('MainPage')).should('exist');
        });

        it('Visit Non-Existing Page', () => {
            cy.visit('/sdfsdfsdfsdf');
            cy.get(selectByTestId('NotFoundPage')).should('exist');
        });
    });

    describe('User is authorized', () => {
        beforeEach(() => {
            cy.login();
        });

        it('Visit Profile Page', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestId('ProfilePage')).should('exist');
        });

        it('Visit Articles Page', () => {
            cy.visit('/articles');
            cy.get(selectByTestId('ArticlesPage')).should('exist');
        });
    });
});
