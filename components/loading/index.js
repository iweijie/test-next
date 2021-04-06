import React from "react"
import { connect } from 'react-redux';
//  public/index.html 中已经引入
// import "./css.scss"

class TopNav extends React.PureComponent {

    constructor(props) {
        super(props);
    }
    getCurrentJson = (userInfo) => {
        let flag = userInfo.isLogin;
        if (flag) {
            return this.json.filter(v => {
                return v.state !== 3
            })
        } else {
            return this.json.filter(v => {
                return v.state !== 2
            })
        }
    }

    template = (
        <div className="global-loading">
            <div className="global-loading-body">
                <span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
                <div className="global-loading-base">
                    <span></span>
                    <div className="global-loading-face"></div>
                </div>
            </div>
            <div className="global-loading-longfazers">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="global-loading-text">do or die</div>
        </div>
    )

    render() {
        let { isLoading } = this.props;
        return isLoading ? this.template : null;
    }
}
const mapStateToProps = (store) => {
    return {
        isLoading: store.isLoading
    }
}
export default connect(mapStateToProps)(TopNav)