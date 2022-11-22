module.exports = {
  apps: {
    name: 'public-api:3701',
    script: './dist/app.js',
  },
  deploy: {
    production: {
      user: 'root',
      host: '101.200.179.232',
      ref: 'origin/main',
      repo: 'git@github.com:xsrole/public-api.git',
      path: '/usr/www/public-api',
      'pre-deploy-local': '',
      'post-deploy': 'pnpm i && pnpm run build && PORT=3701 pm2 start',
      'pre-setup': '',
    },
  },
};
