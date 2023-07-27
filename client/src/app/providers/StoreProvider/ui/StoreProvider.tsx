import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { createReduxStore } from '@/app/providers/StoreProvider/config/store';
import { StateSchema } from '@/app/providers/StoreProvider';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

// eslint-disable-next-line import/no-mutable-exports
export let store = createReduxStore();

function initializeStore(
    initialState: StateSchema,
    asyncReducers: ReducersMapObject<StateSchema>,
) {
    store = createReduxStore(initialState, asyncReducers);
    return store;
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, initialState, asyncReducers } = props;

    if (!store) {
        store = initializeStore(
            initialState as StateSchema,
            asyncReducers as ReducersMapObject<StateSchema>,
        );
    }

    return <Provider store={store}>{children}</Provider>;
};
