import { User } from '@/entities/User';
import { selectByTestId } from '../../helpers/selectByTestId';

export const login = () => {
    cy.getByTestId('loginDropdown').click();
    cy.getByTestId('signInButton').click();
    cy.getByTestId('LoginForm.testUserLogInButton').click();
};

export const getByTestId = (testId: string) => cy.get(selectByTestId(testId));

declare global {
    namespace Cypress {
        interface Chainable {
            login(): Chainable<User>;
            getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
        }
    }
}
