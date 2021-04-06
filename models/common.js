import apis from "../apis";

export default {
    namespace: "common",

    state: {
        browserInfo: __isBrowser__
            ? {
                  height:
                      window.innerHeight ||
                      document.documentElement.clientHeight ||
                      document.body.clientHeight,
                  width:
                      window.innerWidth ||
                      document.documentElement.clientWidth ||
                      document.body.clientWidth,
              }
            : {},
        isLoading: false,
        userInfo: {
            isLogin: false,
        },
    },

    effects: {
        *getBgImageList({ payload }, { call, put }) {
            // eslint-disable-line
            const list = yield call(apis.getBgImageList, payload);
            yield put({ type: "home/homeBgList", payload: list });
        },
        *getUserInfo({ payload }, { call, put }) {
            // eslint-disable-line
            const data = yield call(apis.getUserInfo, payload);
            yield put({
                type: "setUserInfo",
                payload: {
                    isLogin: !!data._id,
                    userId: data._id || "",
                    userName: data.userName || "",
                },
            });
        },
    },

    reducers: {
        setInitBrowserInfo(state) {
            return {
                ...state,
                browserInfo: __isBrowser__
                    ? {
                          height:
                              window.innerHeight ||
                              document.documentElement.clientHeight ||
                              document.body.clientHeight,
                          width:
                              window.innerWidth ||
                              document.documentElement.clientWidth ||
                              document.body.clientWidth,
                      }
                    : {},
            };
        },
        setUserInfo(state, action) {
            return { ...state, userInfo: action.payload };
        },
    },
};
