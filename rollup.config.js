import {terser} from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

export default [
    {
        treeshake: false,
        input: './package/src/selector.js',
        output: {
            file: './package/src/selector.min.js',
            sourcemap: false,
        },
        plugins: [
            terser({
                compress: false,
                mangle: false,
            }),
        ],
    },
    {
        input: './package/src/selector.css',
        output: {
            file: './package/src/selector.min.css',
        },
        plugins: [
            postcss({
                plugins: [autoprefixer()],
                sourceMap: true,
                minimize: true,
                extract: true,
                extensions: ['.css'],
            }),
        ],
    },
];
