import { terser } from "rollup-plugin-terser";
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

export default {
    input: './package/src/selector.css',
    output: {
        file: './package/src/selector.min.css'
    },
    plugins: [
        postcss({
            plugins: [autoprefixer()],
            sourceMap: true,
            extract: true,
            minimize: true,
            extensions: ['.css']
        }),
        terser(),
    ],
};
