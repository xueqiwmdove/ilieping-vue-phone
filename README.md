
# 1.编译环境安装
> OS: Centos7.3

```bash
# 安装 npm
yum install -y npm
# 安装 cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org
# 升级 cnpm
cnpm install cnpm -g

```
# 2.项目编译

```bash
git clone git@192.168.2.152:ilieping-h5/ilieping-phone-vue.git
cd ilieping-vue
# 安装项目依赖
cnpm install 
# 编译
cnpm run build 
```

# 3.配置文件说明
```bash
./src/api/api.js    # 前端访问后端接口地址
```

# 4.项目部署

在项目目录 `ilieping-phone-vue`下, 生成一个`dist/a`目录,

    dist/
    └── a
        ├── login.html
        └── static
            ├── bitbug_favicon\ (1).ico
            ├── css
            ├── img
            └── js

通常`ilieping-phone-vue`项目 和 `ilieping-vue`项目部署到一个web服务器的站点下。
    
    dist 为发布目录。
    dist/
    ├── a
    ├── index.html
    └── static

