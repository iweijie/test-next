import React from "react";
import Link from "next/link";
import { connect } from "react-redux";
import "./css.less";
import { Icon } from "antd";

class TopNav extends React.PureComponent {
    /**
     *state 状态 ：
     *      1 : 所有状态都展示
     *      2 : 登入状态展示
     *      3 : 非登入状态展示
     */
    json = [
        {
            name: "首页",
            url: "/home",
            icon: "home",
            state: 1,
        },
        // {
        //     name: "标签",
        //     url: "/label",
        //     icon: "bars",
        //     state:1
        // },
        {
            name: "设置",
            url: "/set/selftalking",
            icon: "setting",
            state: 2,
        },
        {
            name: "关于",
            url: "/about",
            icon: "user",
            state: 1,
        },
        {
            name: "登入",
            url: "/login",
            icon: "login",
            state: 3,
        },
    ];
    getCurrentJson = (userInfo) => {
        let flag = userInfo.isLogin;
        if (flag) {
            return this.json.filter((v) => {
                return v.state !== 3;
            });
        } else {
            return this.json.filter((v) => {
                return v.state !== 2;
            });
        }
    };

    render() {
        let { isFixed, userInfo } = this.props;
        let className = isFixed ? "top-nav-fixed top-nav" : "top-nav";
        let json = this.getCurrentJson(userInfo);
        return (
            <nav>
                <ul className={className}>
                    {isFixed ? <h2 className="name">weijie</h2> : null}
                    {json.map((v) => {
                        return (
                            <li key={v.url}>
                                <Link href={v.url}>
                                    <span>
                                        <Icon
                                            type={v.icon}
                                            theme="outlined"
                                            style={{ marginRight: "5px" }}
                                        />
                                        {v.name}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        );
    }
}
// export default TopNav

const mapStateToProps = (store, own) => {
    return {
        userInfo: store.common.userInfo,
        isFixed: own.isFixed,
    };
};
export default connect(mapStateToProps)(TopNav);
