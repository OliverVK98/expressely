import * as webpack from 'webpack';
import * as path from 'path';
import { BuildPaths } from '../build/types/config';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { buildSvgLoader } from '../build/loaders/buildSvgLoader';

export default ({ config }: {config: webpack.Configuration}) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    };

    config!.resolve!.modules!.push(paths.src);
    config!.resolve!.extensions!.push('.ts', '.tsx');
    config!.module!.rules!.push(buildCssLoader(true));
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    config!.module!.rules = config!.module!.rules!.map((rule: webpack.RuleSetRule) => {
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i };
        }

        return rule;
    });
    config!.module!.rules.push(buildSvgLoader());
    config!.plugins!.push(new webpack.DefinePlugin({
        __IS_DEV__: true,
        __PROJECT__: JSON.stringify('storybook'),
        __API__: JSON.stringify(''),
    }));

    return config;
};
