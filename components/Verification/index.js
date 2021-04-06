// 核实是否登入
import React from "react"
import { connect } from 'react-redux';
import history from "tool/history"
import isServer from "tool/env"
import { getControlPromise } from "tool/control"

class Verification extends React.PureComponent {

    state = {
        sign: false,
        ...getControlPromise()
    }

    done = true

    componentDidMount() {
        const { resolve, promise } = this.state
        let { verify, userInfo } = this.props;
        !isServer && window.Pace.start()
        promise.then((r) => {
            this.setState({
                sign: r
            })
            if (!r) {
                history.replace("/404")
            }
        })
        if (verify) {
            if (userInfo.isLogin) {
                resolve(true)
            }
        } else {
            resolve(true)
        }
    }

    UNSAFE_componentWillReceiveProps(newPros) {
        const { resolve } = this.state
        const { verify } = newPros
        var p = this.props
        if (verify && newPros.userInfo != p.userInfo) {
            if (newPros.userInfo && newPros.userInfo.isLogin) {
                resolve(true)
            } else {
                resolve(false)
            }
        }
    }

    render() {
        let { sign } = this.state;
        return sign ? this.props.children : null
    }
}
const mapStateToProps = (store, own) => {
    return {
        userInfo: store.userInfoModel,
        verify: own.verify
    }
}
export default connect(mapStateToProps)(Verification)