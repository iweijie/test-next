// 共享
import React from "react"
import dispatchAction from "tool/dispatchAction"
import { connect } from 'react-redux';
import { throttle } from "tool/baseTool"
import isServer from 'tool/env'

class Share extends React.Component {

    UNSAFE_componentWillMount() {
        const { isServerRendering } = this.props;
        // 核实用户信息
        this.props.syncuserInfoCheckAction()
        // 获取背景图片列表
        if (!isServerRendering) {
            this.props.getHomeBgImageActionASync()
        }
        // 服务端渲染 重新获取浏览器宽度
        if (!isServer && isServerRendering) {
            let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
            this.props.resizeAction({
                height,
                width
            })
        }
    }
    componentDidMount() {
        window.addEventListener("resize", throttle(() => {
            let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
            this.props.resizeAction({
                height,
                width
            })
        }, 100))
    }
    render() {
        return null;
    }
}
const mapStateToProps = (store) => {
    return {
        isServerRendering: store.isServerRendering
    }
}
export default connect(mapStateToProps, dispatchAction)(Share)