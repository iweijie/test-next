/**
 *作者: weijie
 *功能描述: 文章列表展示
 *参数说明:
 *时间: 2018/4/16 10:48
 */
import React, { PureComponent } from "react";
import { Icon } from "antd";
import Link from "next/link";
import { timestampFromat } from "../../utils/index";
// import history from "../../../tool/history"
import "./css.less";

class App extends PureComponent {
    goTo = (id) => {
        const { history } = this.props;
        if (!id) return;
        history.push("/article/detail/" + id);
    };
    gotoEditPag = (id) => {
        const { history } = this.props;
        if (!id) return;
        history.push("/set/article/edit/" + id);
    };
    render() {
        var { list, userInfo } = this.props;
        let { userId } = userInfo;
        list = list || [];
        const content = (
            <div className="article-list">
                {list.map((data) => {
                    let tag =
                        (data.tags[0] && data.tags[0].toUpperCase()) || "JS";
                    return (
                        <div className="article-list-item" key={data._id}>
                            {data.img ? (
                                <div className="article-list-item-img">
                                    <img src={data.img} alt="" />
                                </div>
                            ) : (
                                <div
                                    className="article-list-item-text img-mask"
                                    style={{
                                        backgroundColor: data._bg,
                                        color: data._fc,
                                    }}
                                >
                                    {tag}
                                </div>
                            )}
                            <h3 className="display-none">{data.title}</h3>
                            <Link
                                className="article-list-item-title underline"
                                href={`/article/detail/${data._id}`}
                            >
                                {data.title}
                            </Link>
                            。
                            {userId &&
                            data.autor &&
                            userId === data.autor._id ? (
                                <span
                                    onClick={() => this.gotoEditPag(data._id)}
                                    className="article-list-item-edit"
                                >
                                    <Icon type="edit" theme="outlined" />
                                </span>
                            ) : null}
                            <p className="article-list-item-descrption">
                                {data.description}
                            </p>
                            <div className="article-list-item-author">
                                <span className="mr10">
                                    <Icon className="pr5" type="user" />
                                    {data.autor && data.autor.name}
                                </span>
                                <span className="mr10">
                                    <Icon className="pr5" type="calendar" />
                                    {timestampFromat(data.createTime)}
                                </span>
                                <span className="article-list-item-tag mr10">
                                    <Icon type="tag-o" className="pr5" />
                                    {data.tags && data.tags.join("，")}
                                </span>
                                <span>
                                    <Icon className="pr5" type="eye-o" />
                                    {data.time}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        );

        return content;
    }
}

export default App;
// export default withRouter(App)
