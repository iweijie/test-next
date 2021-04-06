import React, { PureComponent } from 'react';
import first from 'lodash/first';
import get from 'lodash/get';
class Bg extends PureComponent {
  render() {
    const { browserInfo, list } = this.props;
    const { height } = browserInfo;
    // const style = height ? { height: height - 56 } : {}
    return (
      <div className="home-bg img-mask">
        <div className="home-bg-img opacity-1">
          <img src={get(first(list), 'fullUrl', '')} alt="" />
        </div>
        <div className="say">
          <div className="title">WEIJIE</div>
          <div className="oath">from small beginning come great things</div>
        </div>
      </div>
    );
  }
}

export default Bg;
