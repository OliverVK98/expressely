import { TOKEN_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { User } from '@/entities/User';
import { selectByTestId } from '../../helpers/selectByTestId';

export const login = (
    username: string = 'testuser',
    password: string = '123',
) =>
    cy
        .request({
            method: 'POST',
            url: 'http://localhost:8000/login',
            body: {
                username,
                password,
            },
        })
        .then(({ body }) => {
            window.localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, body);
            return body;
        });

export const getByTestId = (testId: string) => cy.get(selectByTestId(testId));

declare global {
    namespace Cypress {
        interface Chainable {
            login(email?: string, password?: string): Chainable<User>;
            getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
        }
    }
}
