import 'app/styles/index.scss';
import { Story } from '@storybook/react';
import { Provider } from 'react-redux';
import { createReduxStore, StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';

export const StoreDecorator = (story: () => Story) => {
    const initialState: DeepPartial<StateSchema> = {
        counter: {
            value: 10,
        },
    };
    const store = createReduxStore(initialState as StateSchema);

    return (
        <Provider store={store}>
            {
                story()
            }
        </Provider>
    );
};
