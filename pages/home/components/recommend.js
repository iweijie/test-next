/**
*作者: weijie
*功能描述: 渲染入口文件
*参数说明:
*时间: 2018/4/16 10:48
*/
import React, { PureComponent } from 'react';
import Link from 'next/link'
import {
    Icon
} from "antd"

class Recommend extends PureComponent {
    render() {
        let {list} = this.props
        let recommend = (
            <div className="home-recommend unification-title">
                <p><Icon type="fire" theme="filled" /> 群魔乱舞</p>
                <ul>
                    {
                        list.map((v, k) => {
                            return <li key={v._id}>
                                <span>{k + 1}</span>
                                <Link href={"/article/detail/"+v._id}>{v.title}</Link>
                            </li>

                        })
                    }
                </ul>
            </div>
        )
        return (
            recommend
        );
    }
}

export default Recommend
