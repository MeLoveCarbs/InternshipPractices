import React, { ReactElement } from 'react';
import StoreProvider from './storeProvider';
import Todo from './todo';

const App = (): ReactElement => {
    return (
        <StoreProvider>
            <Todo />
        </StoreProvider>
    );
};

export default App;
