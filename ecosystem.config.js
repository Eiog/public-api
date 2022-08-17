module.exports = {
  apps: {
    name: "public-api",
    script: "./dist/index.js",
  },
  deploy: {
    production: {
      user: "root",
      host: "101.200.179.232",
      ref: "origin/main",
      repo: "git@github.com:a-mans/public-api.git",
      path: "/usr/www/public-api",
      "pre-deploy-local": "",
      "post-deploy": "pnpm i && pnpm run build && PORT=3702 pm2 start",
      "pre-setup": "",
    },
  },
};
