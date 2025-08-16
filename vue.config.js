const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      // 메인 프로세스 소스 디렉토리 설정
      mainProcessFile: 'src/background.js',
      // 렌더러 프로세스에서 Node.js API 사용 방지
      nodeIntegration: false,
      // Context Isolation 활성화 (보안을 위해)
      contextIsolation: true,
      // 메인 프로세스 webpack 설정
      mainProcessWatch: ['src/background.js', 'src/main/**/*'],
      externals: ['node-fetch'], // node-fetch를 external로 처리
    },
  },
  // 메인 프로세스용 webpack 설정
  configureWebpack: (config) => {
    if (process.env.IS_ELECTRON) {
      config.externals = {
        ...config.externals,
        'node-fetch': 'commonjs node-fetch',
      };
    }
  },
});
