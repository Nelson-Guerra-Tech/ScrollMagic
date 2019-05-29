// import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
// import commonjs from 'rollup-plugin-commonjs';
// import nodeResolve from 'rollup-plugin-node-resolve';
// import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import { uglify } from 'rollup-plugin-uglify';

import pkg from './package.json';

const input = 'dev/src/ScrollMagic.js';
const globalName = 'ScrollMagic';

function external(id) {
  return !id.startsWith('.') && !id.startsWith('/');
}

const baseReplacements = {
  '__VERSION__': JSON.stringify(pkg.version)
}

const cjs = [
  {
    input,
    output: { file: `cjs/${pkg.name}.js`, format: 'cjs' },
    external,
    plugins: [
      // babel({ exclude: /node_modules/ }),
      replace({
        // 'process.env.NODE_ENV': JSON.stringify('development')
        ...baseReplacements
      })
    ]
  },

  {
    input,
    output: { file: `cjs/${pkg.name}.min.js`, format: 'cjs' },
    external,
    plugins: [
      // babel({ exclude: /node_modules/ }),
      replace({
        // 'process.env.NODE_ENV': JSON.stringify('production')
        ...baseReplacements
      }),
      uglify()
    ]
  }
];

// const esm = [
//   {
//     input,
//     output: { file: `esm/${pkg.name}.js`, format: 'esm' },
//     external,
//     plugins: [
//       babel({
//         exclude: /node_modules/,
//         runtimeHelpers: true,
//         plugins: [['@babel/transform-runtime', { useESModules: true }]]
//       }),
//       sizeSnapshot()
//     ]
//   }
// ];

// const umd = [
//   {
//     input,
//     output: {
//       file: `umd/${pkg.name}.js`,
//       format: 'umd',
//       name: globalName,
//       globals
//     },
//     external: Object.keys(globals),
//     plugins: [
//       babel({
//         exclude: /node_modules/,
//         runtimeHelpers: true,
//         plugins: [['@babel/transform-runtime', { useESModules: true }]]
//       }),
//       nodeResolve(),
//       commonjs({
//         include: /node_modules/
//       }),
//       replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
//       sizeSnapshot()
//     ]
//   },

//   {
//     input,
//     output: {
//       file: `umd/${pkg.name}.min.js`,
//       format: 'umd',
//       name: globalName,
//       globals
//     },
//     external: Object.keys(globals),
//     plugins: [
//       babel({
//         exclude: /node_modules/,
//         runtimeHelpers: true,
//         plugins: [['@babel/transform-runtime', { useESModules: true }]]
//       }),
//       nodeResolve(),
//       commonjs({
//         include: /node_modules/
//       }),
//       replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
//       sizeSnapshot(),
//       uglify()
//     ]
//   }
// ];

// let config;
// switch (process.env.BUILD_ENV) {
//   case 'cjs':
//     config = cjs;
//     break;
//   case 'esm':
//     config = esm;
//     break;
//   case 'umd':
//     config = umd;
//     break;
//   default:
//     config = cjs.concat(esm).concat(umd);
// }

export default cjs;