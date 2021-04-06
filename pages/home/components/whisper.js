import React, { PureComponent } from 'react';
import Link from 'next/link'
import { Icon, Carousel } from 'antd';

class Whisper extends PureComponent {
  constructor(props) {
    super(props);
  }
  carouselList = [];
  selectedCarousel = '';
  timerId = null;
  nextCarousel = () => {
    if (!this.carouselList || !this.carouselList.length) return;
    this.carouselList.forEach((v) => {
      if (this.refs[v]) {
        this.refs[v].next();
      }
    });
  };

  MouseEnterHandle = (str) => {
    var site = this.carouselList.indexOf(str);
    if (site !== -1) {
      this.selectedCarousel = str;
      this.carouselList.splice(site, 1);
    }
  };
  MouseLeaveHandle = () => {
    if (!this.selectedCarousel) return;
    this.carouselList.push(this.selectedCarousel);
    this.selectedCarousel = '';
  };
  startLoop = (time = 4000) => {
    this.timerId = setInterval(() => {
      this.nextCarousel();
    }, time);
  };
  clearLoop = () => {
    clearInterval(this.timerId);
  };
  componentDidMount() {
    this.startLoop(4000);
  }
  componentWillUnmount() {
    this.clearLoop();
  }
  render() {
    let { list, isLogin } = this.props;
    this.carouselList = [];
    var str = 'whisper';
    this.carouselList.push(str);
    return (
      <div key={str} className={'home-whisper'}>
        <Link href="/selftalking">
          <span>
            <Icon type="star" theme="filled" />
          碎碎念
          </span>
        </Link>

        <div
          className={'home-whisper-content'}
          onMouseLeave={this.MouseLeaveHandle}
          onMouseEnter={() => this.MouseEnterHandle(str)}
        >
          {list && list.length ? (
            <Carousel dots={false} ref={str} dotPosition="left">
              {list.map((val) => (
                <div key={val._id} className={'whisper'}>
                  {val.content}
                </div>
              ))}
            </Carousel>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Whisper;
