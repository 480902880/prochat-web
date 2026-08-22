# ProChat 官网维护文档

ProChat 官网是一个基于 Astro 的静态网站，用于展示 ProChat 桌面聊天客户端、下载入口、隐私说明和常见问题。项目目标是保持页面简洁、可信、响应式，并适合部署到 Cloudflare Pages 或 Workers 静态托管环境。

## 项目信息

- 官网地址：`https://prochat.cc/`
- Windows 下载接口：`https://fantasy480.dpdns.org/api/admin/download/latest`
- Android 下载接口：`https://fantasy480.dpdns.org/api/download/android/latest`
- 官网公告接口：`https://fantasy480.dpdns.org/api/public/website/announcement`
- Android APK 目录：服务器 `/home/qq480902880/downloads/android/`
- 管理端“官网发布”可以上传 `.msi` 或 `.apk`；接口会按最后修改时间返回最新安装包，官网无需重新部署。
- 管理端发布或隐藏公告后，四种语言首页会动态读取；接口异常时公告自动隐藏，不影响静态页面。
- `PUBLIC_PROCHAT_API_ORIGIN` 可在 Cloudflare Pages 构建变量中覆盖 API 域名，默认使用 `https://fantasy480.dpdns.org`。
- 联系邮箱：`support@prochat.cc`
- 版权文案：`© 2026 ProChat · by Crystal Alliance Studio`
- 主要技术：Astro 静态站点
- 部署产物目录：`dist/`
