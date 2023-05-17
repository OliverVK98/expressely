import { DefinePlugin, RuleSetRule } from 'webpack';
import * as webpack from 'webpack';
import * as path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';

export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
        locales: '',
        buildLocales: '',
    };
    if (config!.resolve!.modules) {
        // eslint-disable-next-line no-param-reassign
        config!.resolve!.modules = [
            path.resolve(__dirname, '../../src'),
            'node_modules',
        ];
    }
    config!.resolve!.extensions!.push('.ts', '.tsx');

    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    config!.module!.rules = config.module!.rules!.map((rule: RuleSetRule) => {
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i };
        }

        return rule;
    });

    config!.module!.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });
    config!.module!.rules.push(buildCssLoader(true));

    config!.plugins!.push(
        new DefinePlugin({
            __IS_DEV__: JSON.stringify(true),
            __API__: JSON.stringify('https://testapi.com'),
            __PROJECT__: JSON.stringify('storybook'),
        }),
    );

    return config;
};
