import apis from "../apis";
import get from "lodash/get";

export default {
    namespace: "home",

    state: {
        homeBgList: [
            {
                fullUrl:
                    "http://h1.ioliu.cn/bing/QingMingHuangShan_ZH-CN12993895964_1920x1080.jpg?imagesl",
            },
        ],
        homeScrollToTop: 0,
        selftalking: [],
        recommendList: [],
    },

    effects: {
        *getBgImageList({ payload }, { call, put }) {
            const data = [
                {
                    fullUrl:
                        "http://h1.ioliu.cn/bing/QingMingHuangShan_ZH-CN12993895964_1920x1080.jpg?imagesl",
                },
            ];
        },
        *getRecommendArticl({ payload }, { call, put }) {
            const data = yield call(apis.getRecommendArticl, payload);
            yield put({
                type: "setRecommendList",
                payload: get(data, "result", []),
            });
        },
        *getSelftalkingList({ payload }, { call, put }) {
            const data = yield call(apis.getSelftalkingList, {
                page: 1,
                pageSize: 999,
            });
            yield put({
                type: "setSelftalkingList",
                payload: get(data, "result", []),
            });
        },
        *addSelftalking({ payload }, { call, put }) {
            yield call(apis.addSelftalking, payload);
            yield put({ type: "getSelftalkingList" });
        },
    },

    reducers: {
        setHomeScrollTopAction(state, action) {
            return { ...state, homeScrollToTop: action.payload };
        },
        setHomeBgList(state, action) {
            return { ...state, homeBgList: action.payload };
        },
        setRecommendList(state, action) {
            return { ...state, recommendList: action.payload };
        },
        setSelftalkingList(state, action) {
            return { ...state, selftalking: action.payload };
        },
    },

    subscriptions: {
        setup({ dispatch, history }) {
            // eslint-disable-line
        },
    },
};
