
import React, { PureComponent } from 'react';
class Carousel extends PureComponent {
    constructor(props) {
        super(props);
    }
    state = {
        opcity: 0,
    }
    componentDidMount() {
        this.isloadding = true;
        this.start(this.index, this.props.list)
    }
    UNSAFE_componentWillReceiveProps(next) {
        if (next.list !== this.props.list) {
            this.imageDom = [];
            this.start(this.index, next.list)
        }
    }
    // 图片索引
    index = 0
    // 存放 image
    imageDom = [];
    // 当前倒计时引用
    siteTimerId = null
    // 当前图片是否加载完
    isloadding = false;
    // carousel dom引用
    carousel = null;
    // carouselWrap dom引用
    carouselWrap = null;
    // 获取轮播图容器
    getCarouselDom = () => {
        if (!this.carousel) {
            let div = document.createElement("div");
            div.classList.add("home-bg-img")
            this.carousel = div
        }
        return this.carousel
    }
    // 获取当前图片实例
    getCurrentImg = (index, list) => {
        let _this = this;
        return new Promise((resolve) => {

            if (_this.imageDom[index]) {
                resolve(_this.imageDom[index])
            } else {
                _this.loaddingImg(list[index].fullUrl)
                    .then(img => {
                        // 用于缓存
                        _this.imageDom[index] = img
                        resolve(img)
                    })
            }
        })
    }
    // 设置下一个图的索引
    setNextIndex = (list) => {
        let index = this.index;
        let len = list.length;
        if (index + 1 < len) {
            this.index++
        } else {
            this.index = 0
        }
    }
    // 加载图片
    loaddingImg = (url) => {
        return new Promise((resolve) => {
            let img = new Image();
            img.onerror = img.onload = () => {
                resolve(img)
            }
            img.src = url
        })
    }
    // 一次图片显示的整个流程
    circulation = (index, list) => {
        let _this = this;
        return this.getCurrentImg(index, list)
            .then(img => {
                return new Promise(resolve => {
                    let getCarouselDom = _this.getCarouselDom();
                    getCarouselDom.classList.remove("opacity-1")
                    setTimeout(() => {

                        if (getCarouselDom.__childImg) {
                            getCarouselDom.remove(getCarouselDom.__childImg)
                        }
                        getCarouselDom.__childImg = img;
                        getCarouselDom.appendChild(img)
                        if (!this.carouselWrap) {
                            this.carouselWrap = document.querySelector("#carousel-warp")
                        }
                        this.carouselWrap.appendChild(this.carousel)
                        getCarouselDom.classList.add("opacity-1")
                        setTimeout(resolve, 150)
                    }, 300)
                })
            })
    }
    // 启动轮播图
    start = (index, list) => {
        if (this.isloadding && list.length) {
            let _this = this;
            this.circulation(index, list)
                .then(() => {
                    _this.setNextIndex(list)
                    let nextIndex = _this.index;
                    Promise.all([
                        _this.getCurrentImg(nextIndex, list),
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (!_this.end) {
                                    resolve()
                                } else {
                                    reject()
                                }
                            }, 6000)
                        })
                    ])
                        .then(() => {
                            // debugger
                            _this.start(nextIndex, list)
                        })
                })
        }
    }
    end = false;
    componentWillUnmount() {
    }
    render() {
        let { height } = this.props.browserInfo;
        return (

            <div id="carousel-warp" className="home-bg" style={{ height: (height - 56) + "px" }}>
                <div className="say">
                    <div className="title">WEIJIE</div>
                    <div className="oath">from small beginning come great things</div>
                </div>
            </div>
        );
    }
}

export default Carousel