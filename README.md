# ProChat 官网维护文档

ProChat 官网是一个基于 Astro 的静态网站，用于展示 ProChat 桌面聊天客户端、下载入口、隐私说明和常见问题。项目目标是保持页面简洁、可信、响应式，并适合部署到 Cloudflare Pages 或 Workers 静态托管环境。

## 项目信息

- 官网地址：`https://prochat.cc/`
- 下载接口：`https://manhattancafe.online/api/admin/download/latest`
- 联系邮箱：`support@prochat.cc`
- 版权文案：`© 2026 ProChat · by Crystal Alliance Studio`
- 主要技术：Astro 静态站点
- 部署产物目录：`dist/`

## 目录结构

```text
prochat-web/
├─ public/
│  ├─ prochat.png
│  ├─ robots.txt
│  ├─ sitemap.xml
│  └─ _headers
├─ src/
│  ├─ components/
│  │  ├─ Header.astro
│  │  ├─ Footer.astro
│  │  ├─ Hero.astro
│  │  ├─ MobileHome.astro
│  │  ├─ Features.astro
│  │  ├─ DownloadContent.astro
│  │  └─ DocsContent.astro
│  ├─ i18n/
│  │  ├─ ui.ts
│  │  └─ utils.ts
│  ├─ layouts/
│  │  └─ Layout.astro
│  └─ pages/
│     ├─ index.astro
│     ├─ download.astro
│     ├─ docs.astro
│     ├─ en/
│     ├─ ja/
│     └─ zh-Hant/
├─ astro.config.mjs
├─ package.json
└─ package-lock.json
```

## 本地运行

首次拉取项目后安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

构建静态产物：

```bash
npm run build
```

本地预览构建结果：

```bash
npm run preview
```

如果在 PowerShell 里遇到 `npm.ps1` 执行策略限制，可以使用：

```bash
npm.cmd run build
```

## 多语言规则

站点支持四套语言：

- `zh`：简体中文，默认语言
- `zh-Hant`：繁体中文
- `en`：英文
- `ja`：日文

语言文案集中维护在：

```text
src/i18n/ui.ts
```

新增或修改文案时，需要保证四种语言都有对应 key。页面里通过 `t('key.name')` 读取翻译。

## 自动语言切换

首页会根据网络 IP 和浏览器语言做一次自动判断：

- 中国大陆：简体中文
- 香港、台湾、澳门：繁体中文
- 日本：日文
- 美国及其他地区：英文

自动切换逻辑位于：

```text
src/layouts/Layout.astro
```

为避免页面反复刷新，检测逻辑只在根路径首页执行一次，并使用 `sessionStorage` 记录本次会话已经检测过。

## 电脑页和手机页

首页有两套展示：

- 桌面端：首页使用 `Hero.astro` 和 `Features.astro`
- 手机端：首页使用 `MobileHome.astro`

设备判断逻辑位于 `Layout.astro`，会根据 UA 和屏幕宽度设置：

```html
<html data-device="mobile">
<html data-device="desktop">
```

CSS 会根据 `data-device` 自动显示对应版本。

## 下载入口

下载页组件：

```text
src/components/DownloadContent.astro
```

当前 Windows 下载地址：

```text
https://manhattancafe.online/api/admin/download/latest
```

Android 和 iOS 入口目前已经在页面上开放，后续只需要在 `DownloadContent.astro` 中替换对应链接：

```ts
const futureAndroidEndpoint = '/api/download/android/latest';
const futureIosEndpoint = '/api/download/ios/latest';
```

## 联系邮箱复制

页脚“联系”按钮不会打开邮箱客户端，而是复制邮箱：

```text
support@prochat.cc
```

复制成功后会显示提示：

```text
已复制联系邮箱
```

相关代码位于：

```text
src/components/Footer.astro
```

## SEO 文件

SEO 和爬虫相关文件位于 `public/`：

```text
public/robots.txt
public/sitemap.xml
public/_headers
```

页面级 SEO、Open Graph、Twitter Card、JSON-LD 结构化数据位于：

```text
src/layouts/Layout.astro
```

修改域名、标题、描述、下载链接或组织信息时，需要同步检查这里。

## 设计规则

当前页面使用简洁的蓝、白、灰视觉系统。

维护时请遵守：

- 主色只使用 `--color-primary`
- 背景只使用白色或浅灰
- 不使用渐变背景
- 不使用毛玻璃效果
- 不使用 emoji 作为功能图标
- 卡片只使用边框或阴影，不同时滥用
- 圆角保持 `6px` 或 `8px`
- 字号、间距、颜色尽量使用 `Layout.astro` 中定义的 CSS 变量

全局设计 token 位于：

```text
src/layouts/Layout.astro
```

## 动画规则

站点包含轻量动画和微交互：

- 按钮 hover / active
- 首页聊天预览轻微浮动
- 卡片 hover 反馈
- 语言菜单打开动画
- 联系邮箱复制 toast

动画应保持克制，不要影响阅读。系统开启“减少动态效果”时，站点会通过 `prefers-reduced-motion` 自动弱化动画。

## 部署到 Cloudflare Pages

推荐配置：

```text
Build command: npm run build
Build output directory: dist
Node.js version: 18 或 20
```

部署前建议执行：

```bash
npm run build
```

构建成功后提交并推送：

```bash
git add -A
git commit -m "update site"
git push
```

## 常见维护位置

| 需求 | 文件 |
| --- | --- |
| 修改首页文案 | `src/i18n/ui.ts` |
| 修改桌面首页结构 | `src/components/Hero.astro`、`src/components/Features.astro` |
| 修改手机首页结构 | `src/components/MobileHome.astro` |
| 修改下载按钮链接 | `src/components/DownloadContent.astro` |
| 修改文档和 FAQ | `src/components/DocsContent.astro`、`src/i18n/ui.ts` |
| 修改页脚邮箱复制 | `src/components/Footer.astro` |
| 修改 SEO / 语言检测 | `src/layouts/Layout.astro` |
| 修改站点域名 | `astro.config.mjs`、`src/layouts/Layout.astro`、`public/sitemap.xml` |

## 当前注意事项

- `node_modules/` 不需要提交到 Git。
- `dist/` 是构建产物，不需要提交。
- Windows 终端出现 `LF will be replaced by CRLF` 是换行提示，一般不影响部署。
- 如果在受限环境中构建出现 `spawn EPERM`，通常是本机权限或沙箱限制，不一定是代码错误。
