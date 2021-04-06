import { createStore, applyMiddleware, compose } from "redux";
import assign from "lodash/assign";
import models from "../models/index";
import isBrowser from "../utils/isBrowser";
import enhanceRedux from "./enhanceRedux";
import { REDUX_STORE_ } from "../contants/index";

export default (states = {}) => {
    const _isBrowser_ = isBrowser();

    if (_isBrowser_ && window[REDUX_STORE_]) {
        states = assign(states, window[REDUX_STORE_]);
        delete window[REDUX_STORE_];
    }

    const option = {
        states,
    };

    // {
    //     store, reducers, register, unRegister;
    // }

    return enhanceRedux(models, option);

};
