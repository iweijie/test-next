// 头部 选择时间插件
import React from 'react';
// import colors from "json/color"
import {
    Icon
} from "antd"

class Calendar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // weekList: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            weekList: ['日', '一', '二', '三', '四', '五', '六'],
            monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            // monthList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            dateList: [],
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            currentDay: new Date().getDate(),
            today: this.setYMD(),
            ymd: this.setYMD(new Date(+new Date() - 0 * 24 * 60 * 60 * 1000)),
        }
    }
    UNSAFE_componentWillMount() {
        let { currentDay, month, year } = this.state;
        this.dateArr(year + '-' + month + '-' + currentDay)
    }
    componentDidMount() {
        let { ymd } = this.state;
        const { changeDate } = this.props;
        changeDate && changeDate(ymd.join('-'))
        let { calendarheader, calendar_t, calendar } = this.refs;
        if (!calendarheader || !calendar_t || !calendar) return;
    }
    setYMD = (date) => {   //设置年月日
        date = date || new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let currentDay = date.getDate();
        return [year, month, currentDay]
    }
    getCountDays = (timeFormat) => { //返回某月天数
        var arr = timeFormat.split('-');
        var date = new Date(Number(arr[0]), Number(arr[1]), 0);
        return date.getDate();
    }
    getUpDay = (date) => { //返回上个月的天数
        var arr = date.split('-'), timeFormat;
        if (arr[1] == 1) {
            timeFormat = arr[0] - 1 + '-' + 12 + '-' + 1;
        } else {
            timeFormat = arr[0] + '-' + (arr[1] - 1) + '-' + 1;
        }
        return this.getCountDays(timeFormat);
    }
    dateArr = (date) => {   //设置listArr

        let listArr = [];
        var arr = date.split('-');
        let startDay = this.getUpDay(date);
        let cDate = this.getCountDays(date);
        let startWeek = new Date(arr[0] + '-' + arr[1] + '-' + 1).getDay();
        let endWeek = new Date(arr[0] + '-' + arr[1] + '-' + cDate).getDay();
        let year = Number(arr[0])
        let month = Number(arr[1])
        let next;
        let last;
        if (month <= 1) {
            last = [year - 1, 12];
        } else {
            last = [year, month - 1];
        }
        if (month >= 12) {
            next = [year + 1, 1];
        } else {
            next = [year, month + 1];
        }
        let i;
        for (i = 1; i <= cDate; i++) {
            listArr.push({
                year: year,
                month: month,
                day: i,
                sign: 1
            });
        }
        if (startWeek != 0) {
            for (i = startDay; i > startDay - startWeek; i--) {
                listArr.unshift({
                    year: last[0],
                    month: last[1],
                    day: i,
                    sign: 0
                });
            }
        }
        if (endWeek != 6) {
            for (i = 1; i <= 6 - endWeek; i++) {
                listArr.push({
                    year: next[0],
                    month: next[1],
                    day: i,
                    sign: 2
                });
            }
        }
        if (i > 5) {
            i = 0;
        }
        this.setState({
            dateList: listArr
        })
    }
    changeMonth = (num) => {   // 改变月份
        let timeFormat;
        let { year, month, currentDay } = this.state;
        if (month <= 1 && num < 0) {
            year -= 1;
            month = 12;
        } else if (month >= 12 && num > 0) {
            year += 1;
            month = 1;
        } else {
            month += num
        }
        timeFormat = year + '-' + month + '-' + currentDay
        this.dateArr(timeFormat)
        this.setState({
            year, month, currentDay
        })
    }
    isActive = (params) => { // 判断是否为选中的时间
        let { ymd } = this.state;
        let { y, m, d } = params;
        if (ymd[0] == y && ymd[1] == m && ymd[2] == d) {
            return true
        }
        return false;
    }
    addClassName = (params) => {
        let className = '';
        if (this.isActive(params)) {
            className += ' active'
        }
        return className
    }
    formatChangeData = (params) => {
        let { y, m, d } = params;
        let format = [y, m, d]
        return this.changeData(format)
    }
    changeData = (params) => {
        this.props.changeDate(params.join('-'))
        this.setState({
            ymd: params
        })
    }
    render() {
        let { weekList, dateList, monthList, month, year, today } = this.state;
        let y = today[0];
        let m = today[1];
        let d = today[2];
        if (dateList.length <= 0) return <div />
        let list = [
            dateList.slice(0, 7),
            dateList.slice(7, 14),
            dateList.slice(14, 21),
            dateList.slice(21, 28),
            dateList.slice(28, 35),
        ];
        if (dateList.length > 35) {
            list.push(dateList.slice(35))
        }
        return (
            <div id="calendar" className="calendar">
                <div className="calendar-t">
                    <p className="calendar-t-month"><span>{year + "年" + monthList[month - 1] + "月"}</span></p>
                    <span onClick={() => this.changeMonth(-1)} className="calendar-t-l"> <Icon type="left" /> </span>
                    <span onClick={() => this.changeMonth(1)} className="calendar-t-r"> <Icon type="right" /> </span>
                </div>
                <div className="calendar-m">
                    <ul className="calendar-head" key="thead">
                        {
                            weekList.map((v, k) => {
                                return <li key={k}>{v}</li>
                            })
                        }
                    </ul>
                    {
                        list.map((v, k) => {
                            var className = k == 0 ? "calendar-content mt5" : "calendar-content"
                            return <ul className={className} key={"tr" + k}>
                                {
                                    v.map((value, key) => {
                                        let { year, month, day, sign } = value;
                                        let className = ""
                                        if (sign != 1) {
                                            className = "calendar-content-grey"
                                        } else if (year === y && month === m && day === d && sign) {
                                            className = "calendar-content-today"
                                        }
                                        return <li className={className} key={key}>{day}</li>
                                    })
                                }
                            </ul>
                        })
                    }
                </div>
            </div>
        )
    }
}
export default Calendar