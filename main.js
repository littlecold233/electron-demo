const { app, BrowserWindow } = require('electron')

async function main () {
  await app.whenReady();

  let forceQuit = false;

  const majorWindow = new BrowserWindow({
    title: '微信客户端',
    width: 1000,
    height: 750,
    minWidth: 1000,
    minHeight: 750,
    backgroundColor: '#f2f2f2',
  }); // 主窗口

  // 阻止标题更新
  majorWindow.on('page-title-updated', (e) => {
    e.preventDefault();
  });

  majorWindow.on('close', (e) => {
      // 用户希望退出的时候，不作处理，默认会销毁这个窗口
      if (forceQuit) return;
      e.preventDefault();

      // macOS全屏的处理
      if (majorWindow.isFullScreen()) {
        majorWindow.once('leave-full-screen', () => {
          majorWindow.hide();
        });
        majorWindow.setFullScreen(false);
      } else {
        majorWindow.hide();  // 隐藏窗口
      }
  });

  // 点击dock打开主窗口
  app.on('activate', () => {
    majorWindow.show();
  });

  // 用户使用cmd + Q、代码中调用app.quit等情况
  // 此时用户希望能够退出应用，因此将forceQuit改为true
  app.on('before-quit', () => {
    forceQuit = true;
  });
  
  app.dock.setIcon('./img/icon.png'); // 在app打包后，这一句代码其实是不需要的

  majorWindow.loadURL('https://wx.qq.com'); // http协议加载前端资源
  // majorWindow.loadURL('file://index.html'); // file协议加载前端资源

}

main();