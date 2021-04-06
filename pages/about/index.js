import React from "react";
import TopNav from "../../components/topNav";
import { Row, Col } from "antd";
import Image from "next/image";
import "./css.less";

const About = () => {
    return (
        <div>
            <TopNav isFixed />
            <div className="about-wrap">
                <div className="about-wrap-top">
                    <div className="user-via tac">
                        <Image
                            src="/images/logo.jpg"
                            alt="头像"
                            width={500}
                            height={500}
                        />
                    </div>
                    <p className="about-author-name">weijie</p>
                    <p className="tac">一个小渣渣前端，正在努力学习中</p>
                    <i className="about-line"></i>
                </div>
                <Row className="about-wrap-body">
                    <Row className="mb20">
                        <Col className="about-title tar" span={10}>
                            关于我：
                        </Col>
                        <Col span={16}></Col>
                        <Col className="" offset={9} span={19}>
                            <div className="mt6">
                                Web前端开发,慢慢学习后台中
                            </div>
                            <div className="mt6">来自湖北，现居深圳</div>
                            <div className="mt6">Email：375030086@qq.com</div>
                        </Col>
                    </Row>
                    <Row className="mb20">
                        <Col className="about-title tar" span={10}>
                            关于本站：
                        </Col>
                        <Col span={16}></Col>
                        <Col className="" offset={9} span={19}>
                            <div className="mt6">
                                本站代码托管于
                                <a
                                    target="_blank"
                                    href="https://github.com/weijie9520/blog-react-ssr"
                                >
                                    Github
                                </a>
                                （简单的SSR版本）
                            </div>
                            <div className="mt6">
                                原版本代码托管于
                                <a
                                    target="_blank"
                                    href="https://github.com/weijie9520/blog-react"
                                >
                                    Github
                                </a>
                                （已停止更新）
                            </div>
                            <div className="mt6">
                                后台代码
                                <a
                                    target="_blank"
                                    href="https://github.com/weijie9520/blog-koa2-api"
                                >
                                    Github
                                </a>
                            </div>
                            <div className="mt6">
                                折腾开始于2018年3月，而后至今修修改改。
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb20">
                        <Col className="about-title tar" span={10}>
                            关于性格：
                        </Col>
                        <Col span={16}></Col>
                        <Col className="" offset={9} span={19}>
                            <div className="mt6">不撞南墙，怎知撞不破！</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="about-title tar" span={10}>
                            关于其他：
                        </Col>
                        <Col span={16}></Col>
                        <Col className="" offset={9} span={19}>
                            <div className="mt6">DNF 18级狂战士</div>
                            <div className="mt6">LOL 远超青铜级选手</div>
                            <div className="mt6">云顶 远超青铜级选手</div>
                        </Col>
                    </Row>
                </Row>
            </div>
        </div>
    );
};

export default About;
