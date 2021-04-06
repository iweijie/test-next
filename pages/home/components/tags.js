import React, { PureComponent } from "react";
import Link from "next/link";

class Tags extends PureComponent {
    // goTo = (id)=>{
    //     history.push("/tags/" + id)
    // }
    render() {
        const { list, currentTag } = this.props;
        return (
            <ul className="home-tags clearfix">
                {list.map((v) => {
                    return (
                        <li
                            className={currentTag === v.tagCode ? "active" : ""}
                            key={v.tagCode}
                        >
                            <Link href={`/tags/${v.tagCode}`}>
                                <span>{v.tagName} <span>[{v.count}]</span></span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

export default Tags;
