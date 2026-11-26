module.exports = {
  apps: [{
    name: 'vaiket-blog',
    script: 'npm',
    args: 'start',
    cwd: __dirname,
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    time: true,
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
  }],
}
