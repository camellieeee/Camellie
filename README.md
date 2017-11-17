# Camellie
第一款基于react-native的App
## 0 介绍
1. 暂只支持ios
2. 下载：git clone https://github.com/camellieeee/Camellie.git
3. 安装：cd camellie --> npm install --> react-native run-ios
4. 服务端：具体看下面说明


### 1 项目文件目录组织
```
    Camellie
            __tests__                        //测试文件
            android                          //安卓编译之后的文件
            img                         //图片文件
            ios                         //xcode所在文件
            node_modules                  //项目所依赖lib，初创项目使用npm install得到
            src
                common      //配置文件
                    path    //动画库
                    Color.js    //App颜色配置
                    utils.js    //App网络配置
                components      //App组件
                reducers        //reducers
                screens         //页面文件
                app.js
            index.js                //主入口文件
            package.json                  //配置信息
```

### 2 页面展示
1. 登录界面
![登录界面](/service/public/image/login.png "登录界面")
2. 首页界面
![首页界面](/service/public/image/index.png "首页界面")
3. 资讯界面
![资讯界面](/service/public/image/information.png "资讯界面")
4. 地图操作
![地图操作](/service/public/image/map.png "地图操作")
4. 时间轴操作
![时间轴操作](/service/public/image/timeline.png "时间轴操作")
5. 聊天室
![聊天室](/service/public/image/chatroom.png "聊天室")


### 3 优化加载
打包jsbundle文件 加载成功便于app加载
react-native bundle --entey-file index.ios.js --platform ios --dev false --bndle-output main.ios.jsbundle

### 4 第三方组件
1. [lottie-react-native](https://github.com/airbnb/lottie-react-native)
2. [react-native-baidu-map](https://github.com/lovebing/react-native-baidu-map)
3. [react-native-cardview](https://github.com/Kishanjvaghela/react-native-cardviewr)
4. [react-native-gifted-chat](https://github.com/FaridSafi/react-native-gifted-chat)
5. [react-native-easy-toast](https://github.com/crazycodeboy/react-native-easy-toast)
6. [react-native-interactable](https://github.com/wix/react-native-interactable)
7. [react-native-keyboard-aware-scroll-view](https://github.com/APSL/react-native-keyboard-aware-scroll-view)
8. [react-native-linear-gradient](https://github.com/react-native-community/react-native-linear-gradient)
9. [react-native-navigation](https://github.com/wix/react-native-navigation)
10. [react-native-safari-view](https://github.com/naoufal/react-native-safari-view)
11. [react-native-snap-carousel](https://github.com/archriss/react-native-snap-carousel)
12. [react-native-timeline-listview](https://github.com/thegamenicorus/react-native-timeline-listview)
13. [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

























