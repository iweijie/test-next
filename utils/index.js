/**
 *作者: weijie
 *功能描述: 全局公共方法文件
 *时间: 2018/4/2 14:35
 */

import isBrowser from "./isBrowser";
import { message } from "antd";

const isServer = !isBrowser();

function log_server(msg) {
    console.log(msg);
}

let log_server_obj = {
    success: log_server,
    error: log_server,
    warning: log_server,
};

export const log = (function () {
    let log;
    if (isServer) {
        log = log_server_obj;
    } else {
        log = message;
    }
    return log;
})();

/**
 *作者: weijie
 *功能描述: menu 过滤
 *时间: 2018/4/2 14:35
 */

export const filterMenu = function (arr, flag) {
    var obj = {
        menuList: [],
        menuPath: [],
        origin: arr,
    };
    if (!Array.isArray(arr)) return obj;
    var list = obj.menuList,
        path = obj.menuPath;
    for (var i = 0, l = arr.length; i < l; i++) {
        var val = arr[i];
        if (!val.isPublic && !flag) {
            continue;
        }
        var child = val.childrens;
        if (child && child.length) {
            for (var len = child.length, j = len - 1; j >= 0; j--) {
                if (!child[j].isPublic && !flag) {
                    child.splice(j, 1);
                } else {
                    path.push(child[j].url);
                }
            }
        } else {
            path.push(val.url);
        }
        list.push(val);
    }
    path.push("/");
    return obj;
};

/**
 *作者: weijie
 *功能描述: 设置cookie
 *参数说明:
 * @param {string} cookieName  名称
 * @param {string} value 值
 * @param {number} expiretimes 设置时间
 *时间: 2018/4/2 14:39
 */
export const setCookie = function (cookieName, value, expiretimes) {
    var exdate = new Date();
    var domain = document.domain.replace(/.*\.(.*\..*)/g, "$1");
    exdate.setTime(exdate.getTime() + expiretimes);
    document.cookie =
        cookieName +
        "=" +
        escape(value) +
        ";path=/;domain=" +
        domain +
        ";" +
        (expiretimes == null ? "" : ";expires=" + exdate.toGMTString());
};

/**
 *作者: weijie
 *功能描述: 获取cookie
 *参数说明:
 * @param {string} cookieName 名称
 * @return {string}
 *时间: 2018/4/2 14:39
 */
export const getCookie = function (cookieName) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(cookieName + "=");
        if (c_start != -1) {
            c_start = c_start + cookieName.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
        return "";
    }
    return "";
};

/**
 *作者: weijie
 *功能描述: 对象参数序列化
 *参数说明:
 * @return {string}
 *时间: 2018/4/2 16:32
 */
export const objTodata = (obj) => {
    const arr = [];
    for (let o in obj) {
        if (obj[o]) {
            arr.push(o + "=" + obj[o]);
        }
    }
    return arr.join("&");
};
/**
 *作者: weijie
 *功能描述: 获取本地数据
 *参数说明:
 * @return {object}
 *时间: 2018/4/2 16:28
 */
export const getLocation = (name) => {
    let local = localStorage.getItem(name);
    return JSON.parse(local);
};
export const setLocation = (name, obj) => {
    if (!obj || !name) return;
    if (typeof obj == "string") {
        localStorage.setItem(name, obj);
    } else {
        localStorage.setItem(name, JSON.stringify(obj));
    }
};
/**
 *作者: weijie
 *功能描述:timestampFromat 时间格式化 方法
 *参数说明:
 * @param {number} v 毫秒数
 * @param {number} t 类型1 返回年月日 类型2返回年月日时分秒
 * @param {string} interval 分隔符
 * @return {string}
 *时间: 2018/4/2 16:22
 */
export const timestampFromat = (v, t = 1, interval = "-") => {
    if (v == 0 || v == undefined) {
        return null;
    }
    const date = new Date(v);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    let d = date.getDate();
    d = d < 10 ? "0" + d : d;
    let h = date.getHours();
    h = h < 10 ? "0" + h : h;
    let minute = date.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;
    let second = date.getSeconds();
    second = second < 10 ? "0" + second : second;
    return t == 1
        ? y + interval + m + interval + d
        : y +
              interval +
              m +
              interval +
              d +
              " " +
              h +
              ":" +
              minute +
              ":" +
              second;
};

/**
 *作者: weijie
 *功能描述: 防抖
 */
export function debounce(fn, delay = 200) {
    var timer;
    return function () {
        var th = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = null;
            fn.apply(th, args);
        }, delay);
    };
}
/**
 *作者: weijie
 *功能描述: 节流
 */
export function throttle(fn, interval = 200) {
    var last, timer;
    return function () {
        var th = this;
        var args = arguments;
        var now = Date.now();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn.apply(th, args);
            }, interval);
        } else {
            clearTimeout(timer);
            last = now;
            fn.apply(th, args);
        }
    };
}

/**
 *作者: weijie
 *功能描述: 统一 promise catch 处理方式（兼容服务端）
 */
export function promiseCatch(err) {
    isServer
        ? log.error(`message: ${err.message}, stack: ${err.stack}`)
        : log.error(err.messgae);
}

/**
 * 文本复制
 * copyToShearplate("weijie")
 */

export function copyToShearplate(str) {
    var input = document.createElement("input");
    input.type = "text";
    input.value = str;
    document.body.appendChild(input);
    // HTMLInputElement.select() 方法选中一个 <textarea>
    // 元素或者一个 带有 text 字段的 <input> 元素里的所有内容。
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
}
// 获取随机色
export function getRandomBgColor() {
    var r = Math.floor(Math.random() * 256),
        g = Math.floor(Math.random() * 256),
        b = Math.floor(Math.random() * 256),
        a = 1;
    // a = Math.floor((Math.random()*.5 + .5)*10)/10;
    return [r, g, b, a];
}

// 获取能很好显示的 字体色
// https://blog.csdn.net/wpwalter/article/details/78671680
export function isLight(rgb) {
    return 0.213 * rgb[0] + 0.715 * rgb[1] + 0.072 * rgb[2] > 255 / 2;
}
// 色值取反
export function colorReverse(OldColorValue) {
    OldColorValue = "0x" + OldColorValue.replace(/#/g, "");
    var str = "000000" + (0xffffff - OldColorValue).toString(16);
    return str.substring(str.length - 6, str.length);
}

/**
 *作者: weijie
 *时间: 2018/8/16
 *描述: 图片弹框展示
 * @param {string} 图片地址
 * @param {Boolean} 浏览器宽高变化时重新计算
 **/
export const popUpImage = (function () {
    if (isServer) return () => {};
    var maskStyle = {
        position: "fixed",
        top: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 10000,
        left: 0,
        fontSize: "12px",
        display: "none",
        alignItems: "center",
        justifyContent: "center",
    };
    var wrapStyle = {
        position: "relative",
        padding: "5px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 14px 2px rgba(0, 0, 0, 0.20)",
        borderRadius: "4px",
        overflow: "hidden",
        boxSizing: "border-box",
    };
    var imgStyle = {
        display: "block",
        width: "100%",
        height: "100%",
    };
    var iconStyle = {
        width: "30px",
        height: "30px",
        cursor: "pointer",
        float: "right",
        "line-height": "30px",
        "margin-left": "10px",
    };
    var iconWrapStyle = {
        position: "fixed",
        right: "20px",
        top: "10px",
        background: "rgba(0, 0, 0, 0.6)",
        "z-index": 1,
        "font-size": "25px",
        color: "#fff",
        "text-align": "center",
    };
    var flexStyle = { display: "flex" };
    var noneStyle = { display: "none" };
    // 间距
    var space = 10;
    // 图片放大移动时 ，上下左右留白的距离
    var moveSpace = 20;
    var store = {
        // 放大移动事件添加 标识
        isAddEvent: false,
        // img 外层 dom 引用
        stie: null,
        // 0 正常； 1 放大 ； 2 缩小
        status: 0,
    };

    var mask = document.createElement("div");
    var sh = (store.sh =
        window.innerHeight || document.documentElement.clientheight);
    var sw = (store.sw =
        window.innerWidth || document.documentElement.clientWidth);
    mask.style.width = sw + "px";
    mask.style.height = sh + "px";
    css(mask, maskStyle);
    var iconWrap = document.createElement("ul");
    css(iconWrap, iconWrapStyle);
    mask.appendChild(iconWrap);

    var close = `<li title="关闭" class="close" style="${stringify(
        iconStyle
    )}"><i aria-label="close" class="anticon anticon-close"><svg viewBox="64 64 896 896" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></i></li>`;
    var zoom = `<li title="放大" class="zoom" style="${stringify(
        iconStyle
    )}"><i aria-label="大" class="anticon anticon-fullscreen"><svg viewBox="64 64 896 896" class="" data-icon="fullscreen" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path d="M290 236.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0 0 13.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 0 0 0 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 0 0-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z"></path></svg></i></li>`;
    var shrink = `<li title="缩小" class="shrink" style="${stringify(
        iconStyle
    )}"><i aria-label="小" class="anticon anticon-fullscreen-exit"><svg viewBox="64 64 896 896" class="" data-icon="fullscreen-exit" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path d="M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 0 0 0 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 0 0 391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 0 0-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z"></path></svg></i></li>`;
    iconWrap.innerHTML = close + shrink + zoom;

    close = iconWrap.querySelector(".close");
    zoom = iconWrap.querySelector(".zoom");
    shrink = iconWrap.querySelector(".shrink");
    mask.addEventListener("mousewheel", function (e) {
        e.stopPropagation();
        e.preventDefault();
    });
    close.addEventListener("click", function () {
        css(mask, noneStyle);
        if (store.stie) {
            mask.removeChild(store.stie);
            store.stie = null;
            store.status = 0;
        }
    });
    zoom.addEventListener("click", function () {
        if (!store.stie || store.status !== 2) return;
        if (store.sw < store.imgW || store.sh < store.imgH) {
            store.status = 1;
            css(store.stie, {
                position: "absolute",
                cursor: "pointer",
                top: moveSpace + "px",
                left: moveSpace + "px",
                width: store.imgW + 10 + "px",
                height: store.imgH + 10 + "px",
            });
            store.stie.addEventListener("mousedown", function (event) {
                if (event.button === 0) {
                    event.stopPropagation();
                    event.preventDefault();
                    const wrap = store.stie;
                    const { imgW, imgH, sw, sh } = store;
                    // top left 最大值 与最小值 只能取其之间 包含自身

                    const w =
                        imgW > sw
                            ? [sw - imgW - 2 * moveSpace, moveSpace]
                            : [-2 * moveSpace, sw - imgW + moveSpace];
                    const h =
                        imgH > sh
                            ? [sh - imgH - 2 * moveSpace, moveSpace]
                            : [2 * moveSpace, sh - imgH + moveSpace];

                    let { left, top } = window.getComputedStyle(wrap);
                    left = parseInt(left);
                    top = parseInt(top);
                    const { clientX, clientY } = event;
                    const move = (e) => {
                        let x = e.clientX;
                        let y = e.clientY;
                        let topValue = top + (y - clientY);
                        let leftValue = left + (x - clientX);
                        topValue =
                            topValue < h[0]
                                ? h[0]
                                : topValue > h[1]
                                ? h[1]
                                : topValue;
                        leftValue =
                            leftValue < w[0]
                                ? w[0]
                                : leftValue > w[1]
                                ? w[1]
                                : leftValue;
                        wrap.style.top = topValue + "px";
                        wrap.style.left = leftValue + "px";
                    };
                    document.addEventListener(
                        "mouseup",
                        () => {
                            document.removeEventListener("mousemove", move);
                        },
                        { once: true }
                    );
                    document.addEventListener("mousemove", move);
                }
            });
        }
    });
    shrink.addEventListener("click", function () {
        if (!store.stie || store.status !== 1) return;
        store.status = 2;
    });
    document.body.appendChild(mask);
    function popUp(src, flag = false) {
        if (!src) return;
        var wrap = (store.stie = document.createElement("div"));
        css(wrap, wrapStyle);
        if (flag) {
            store.sh = sh =
                window.innerHeight || document.documentElement.clientheight;
            store.sw = sw =
                window.innerWidth || document.documentElement.clientWidth;
            css(mask, {
                width: sw + "px",
                height: sh + "px",
            });
        }
        var img = new Image();
        css(img, imgStyle);
        img.addEventListener("load", function (e) {
            var w = (store.imgW = e.target.width);
            var h = (store.imgH = e.target.height);
            var obj = {};
            if (!(w + 2 * space <= sw) || !(h + 2 * space <= sh)) {
                var wratio = w / sw;
                var hratio = h / sh;
                if (hratio > wratio) {
                    // 宽
                    obj.height = sh - 2 * space;
                    var actualwidth = Math.floor((w / h) * obj.height);
                    obj.width = actualwidth;
                } else {
                    obj.width = sw - 2 * space;
                    var actualHeight = Math.floor((h / w) * obj.width);
                    obj.height = actualHeight;
                }
            } else {
                obj.width = w;
                obj.height = h;
            }
            store.computedW = obj.width;
            store.computedH = obj.height;
            if (store.imgW > sw || store.imgH > sh) {
                store.status = 2;
            }
            obj.width += "px";
            obj.height += "px";

            css(wrap, obj);
            wrap.appendChild(img);
            css(mask, flexStyle);
        });
        img.addEventListener("error", function () {
            if (store.stie) {
                wrap.removeChild(store.stie);
                store.stie = null;
            }
            wrap.appendChild("图片加载失败,请尝试刷新");
            css(mask, flexStyle);
        });
        mask.appendChild(wrap);
        img.setAttribute("src", src);
    }
    function css(dom, obj) {
        for (var k in obj) {
            dom.style[k] = obj[k];
        }
    }
    function stringify(obj) {
        return Object.keys(obj)
            .map((v) => `${v}:${obj[v]}`)
            .join(";");
    }
    return popUp;
})();

export function distinct(arr = []) {
    var set = new Set(arr);
    return Array.from(set);
}

/**
 *作者: weijie
 *功能描述: 页面不兼容CSS3的提示信息
 *参数说明:
 *时间: 2018/4/2 16:22
 */

(function () {
    if (!isServer && !("flex" in document.body.style)) {
        const root = document.getElementById("root");
        const first = document.body.firstChild;
        var html = document.createElement("div");
        html.innerHTML = `<div style='line-height:50px;background:#ff0000;color:#ffffff;position: absolute;top:0px;left:0px;width:100%;z-index:99999;text-align:center;' onclick="javascript:this.style.display='none'">您的浏览器版本过低，为了更好的体验，请您升级浏览器！<a style="color:#108ee9" href="http://se.360.cn/" target="_blank" rel='nofollow'>点击更新</a></div>`;
        document.body.insertBefore(html, first);
        root.style.display = "none";
    }
})();

/**
 * 重写store， 用于添加前置操作；例如 浏览器宽高； 验证用户信息 等
 *
 */

export async function recomposeStore(initStore) {}

export const globalServerRenderCtxDataName = "__serverRenderCtxData";
export const uuidName = "@@UUID_WEIJIE";

/**
 * 判断当前设备信息
 */

export const os = (function () {
    if (isServer) return {};
    const ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet =
            /(?:iPad|PlayBook)/.test(ua) ||
            (isAndroid && !/(?:Mobile)/.test(ua)) ||
            (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian;
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc,
    };
})();
