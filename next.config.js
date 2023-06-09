const path = require('path');

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    webpack(config) {
        // disable css-module in Next.js
        // source: https://github.com/vercel/next.js/discussions/14672
        config.module.rules.forEach((rule) => {
          const { oneOf } = rule;
          if (oneOf) {
            oneOf.forEach((one) => {
              if (!`${one.issuer?.and}`.includes('_app')) return;
              one.issuer.and = [path.resolve(__dirname)];
            });
          }
        })
        return config;
      },
}