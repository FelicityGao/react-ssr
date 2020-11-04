
const path = require('path')
const CracoLessPlugin = require('craco-less');

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve("src"),
      "@utils": path.resolve("src/utils"),
    },
    configure: (config, { env, paths }) => { 
      config.module.rules.forEach(d => {
        d.oneOf &&
          d.oneOf.forEach(e => {
            console.log('e', e)
            if (e && e.options && e.options.name) {
              e.options.name = e.options.name.replace('[hash:8].', '');
            }
          });
      });
      return config;
     }
},
// plugins: [
//   {
//     plugin: CracoLessPlugin,
//     options: {
//       lessLoaderOptions: {
//         lessOptions: {
//           modifyVars: { '@primary-color': '#1DA57A' },
//           javascriptEnabled: true,
//         },
//       },
//     },
//   },
// ],
};
