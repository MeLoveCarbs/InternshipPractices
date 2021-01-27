import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import PropTypes from 'prop-types';

const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export const StoreProvider: React.FC = (props) => {
    const { children } = props;

    return <Provider store={store}>{children}</Provider>;
};

StoreProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default StoreProvider;
