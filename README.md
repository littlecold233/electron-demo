# electron-demo

* 创建主窗口，阻止关闭主窗口关闭的默认事件，不销毁窗口。（大部分客户端的主窗口，关闭主窗口的时候，实际上是隐藏了该窗口，例如QQ、微信）

* 应用退出时，会尝试关闭所有窗口，再退出应用。如果主窗口的关闭行为默认事件被阻止，那么会导致主窗口无法关闭，整个应用无法退出。因此使用`forceQuit`这个变量来控制。

* 使用http或者file协议加载窗口前端资源（例子中，默认加载的是微信）

## development

安装依赖：`ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/" yarn`

启动：`yarn start`