import React, { PureComponent } from "react";

import { Carousel } from "antd";

class SmallCarousel extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        let { list } = this.props;
        return (
            <Carousel className="home-small-carousel" vertical>
                {list.map((v, k) => {
                    return (
                        <div key={k} className="home-small-carousel-item">
                            <img src={v.smallUrl} alt="" />
                        </div>
                    );
                })}
            </Carousel>
        );
    }
}

export default SmallCarousel;
