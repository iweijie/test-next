/**
*作者: weijie
*功能描述: 渲染入口文件
*参数说明:
*时间: 2018/4/16 10:48
*/
import React, {Component} from 'react';

class Annotation extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.refs.buddha.addEventListener("selectstart",(e)=>{
            e.stopPropagation()
            e.returnValue = false;
            return false
        })
    }
    render() {

        const content = (
            <div className="margin-ms-top" ref="buddha">
                    <pre>_ooOoo_</pre>
                    <pre>o8888888o</pre>
                    <pre>88" . "88</pre>
                    <pre>(| -_- |)</pre>
                    <pre>O\  =  /O</pre>
                <pre>____/'---'\____</pre>
                <pre>.'  \\|     |//  '.</pre>
            <pre>/  \\|||  :  |||//  \</pre>
            <pre>/  _||||| -:- |||||-  \</pre>
            <pre>|   | \\\  -  /// |   |</pre>
            <pre>| \_|  ''\---/''  |   |</pre>
            <pre>\  .-\__  '-'  ___/-. /</pre>
            <pre>___'. .'  /--.--\  '. . __</pre>
        <pre>."" '    ___\_ | _/___.'   ’.</pre>
        <pre>| | :  '- \'.;'\ _ /';.'/ - ' : | |</pre>
        <pre>\  \ '-.   \_ __\ /__ _/   .-' /  /</pre>
    <pre>======'-.____'-.___\_____/___.-'____.-'======</pre>
                    <pre>'=---='</pre>
<pre>^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</pre>
            <pre>佛祖保佑       永无BUG</pre>
        </div>)

        return (
            content
        );
    }
}

export default Annotation
