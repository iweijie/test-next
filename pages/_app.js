import "antd/lib/";
import "../styles/basics.less";

import App from "next/app";
import WithRedux from "../components/withReduxHoc";
import { Provider } from "react-redux";


if (__isBrowser__) {
    console.log("window __isBrowser__:", __isBrowser__);
    window.__isBrowser__ = __isBrowser__;
} else {
    console.log("global __isBrowser__:", __isBrowser__);
    global.__isBrowser__ = __isBrowser__;
}

function MyApp({ Component, pageProps, ReduxStore }) {
    return (
        <Provider store={ReduxStore}>
            <Component {...pageProps} />
        </Provider>
    );
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext);

    /* 获取store并初始化 */
    const store = appContext.ReduxStore;
    // store.subscribe(() => {
    // 	console.log("store change");
    // });
    // store.dispatch({ type: "add" });

    return { ...appProps };
};

export default WithRedux(MyApp);
