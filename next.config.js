const withCSS = require("@zeit/next-css");
const withLess = require("@zeit/next-less");
const webpack = require("webpack");

module.exports = (...rest) => {
    return withLess(
        withCSS({
            cssModules: false,
            async redirects() {
                return [
                    {
                        source: "/",
                        destination: "/home",
                        permanent: true,
                    },
                ];
            },
            webpack: (config, options) => {
                const __isBrowser__ = !options.isServer;
                const __dev__ = options.dev;

                if (options.isServer) {
                    const antStyles = /antd\/.*?\/style\/css.*?/;
                    const origExternals = [...config.externals];
                    config.externals = [
                        (context, request, callback) => {
                            if (request.match(antStyles)) return callback();
                            if (typeof origExternals[0] === "function") {
                                origExternals[0](context, request, callback);
                            } else {
                                callback();
                            }
                        },
                        ...(typeof origExternals[0] === "function"
                            ? []
                            : origExternals),
                    ];
                    config.module.rules.unshift({
                        test: antStyles,
                        use: "null-loader",
                    });
                }

                config.plugins.push(
                    new webpack.DefinePlugin({
                        __isBrowser__,
                        __dev__,
                    })
                );
                return config;
            },
        })
    );
};
