import webpack from 'webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CircularDependencyPlugin from 'circular-dependency-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { BuildOptions } from './types/config'

export function buidlPlugins({paths, isDev, apiUrl, project}: BuildOptions): webpack.WebpackPluginInstance[] {
    const plugins = [
            new HTMLWebpackPlugin({
                template: paths.html
            }),
            new webpack.ProgressPlugin(),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css'
            }),
            new webpack.DefinePlugin({
                __IS_DEV__: JSON.stringify(isDev),
                __API__: JSON.stringify(apiUrl),
                __PROJECT__: JSON.stringify(project)
            }),
            new CircularDependencyPlugin({
                exclude: /a\.js|node_modules/,
                include: /dir/,
                failOnError: true,
                allowAsyncCycles: false,
                cwd: process.cwd()
            })
    ]
    if (isDev) {
        plugins.push(new BundleAnalyzerPlugin({openAnalyzer: false}))
    }
    return plugins
}