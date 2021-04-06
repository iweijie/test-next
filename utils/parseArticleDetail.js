import marked from "marked"
import highlight from "./highlight/highlight.pack"
import "./highlight/styles/github.css"

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code) {
        return highlight.highlightAuto(code, ["javascript", "css", "html"]).value;
    },
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: true,
    xhtml: false
});


const formatRight = (arr) => {
    for (var i = 0; i < arr.length; i++) {
        if (i + 1 >= arr.length) continue;
        var data = arr[i];
        var next = arr[i + 1];
        if (data.level === next.level) continue;
        if (next.level > data.level) {
            if (!data.child) {
                data.child = []
            }
            if (data.child.length && next.level > data.child[data.child.length - 1].level) {
                if (!data.child[data.child.length - 1].child) {
                    data.child[data.child.length - 1].child = []
                }
                data.child[data.child.length - 1].child.push(next)
            } else {
                data.child.push(next)
            }
            arr.splice(i + 1, 1)
            i--;
        }
    }
    return arr
}

const match = (html) => {
    var arr = [];
    var uid = 0;
    var prefix = "md-wj-"
    var newStr = html.replace(/<h[1-6]{1} id="(\S*?)">(.*?)<\/h[1-6]{1}>/g, function (str, matchId, matchName) {
        uid++;
        var id = prefix + uid;
        var num = Number(str.match(/<h([1-6]{1}).*?>/)[1])
        arr.push({ level: num, id, name: matchName })
        return str.replace(matchId, id)
    })
    return {
        html: { __html: newStr },
        nav: formatRight(arr)
    }
}

const setATagBlank = (temp) => {
    var a;
    while (a = temp.match(/<a href=.*?>.*?<\/a>/)) {
        if (a) {
            var str = a[0]
            var arr = str.split(" ")
            arr.splice(1, 0, "target=_blank")
            var newstr = arr.join(" ")
            temp = temp.replace(str, newstr)
        }
    }
    return temp
}


/**
 * 解析文章详情
 */

export default (temp) => {
    var template = marked(temp)
    template = setATagBlank(template)
    return match(template);
}