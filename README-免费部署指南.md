# 🚀 免费部署指南：让网站在任何计算机上可访问

## 🎯 部署方案概览
以下是100%免费的部署方案，让你的Hugo网站可以在任何计算机上访问：

## 📋 方案1：GitHub Pages（推荐）
**完全免费，无需服务器，支持自定义域名**

### 步骤1：准备GitHub仓库
1. 创建GitHub账号：https://github.com
2. 创建新仓库：`your-username.github.io`
3. 将项目推送到仓库：

```bash
# 初始化Git仓库
cd riboo-temboo
git init
git add .
git commit -m "Initial commit"

# 添加远程仓库
git remote add origin https://github.com/your-username/your-username.github.io.git
git push -u origin main
```

### 步骤2：自动部署配置
创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
      with:
        submodules: true
        fetch-depth: 0
    
    - name: Setup Hugo
      uses: peaceiris/actions-hugo@v2
      with:
        hugo-version: 'latest'
        extended: true
    
    - name: Build
      run: hugo --minify
    
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./public
```

### 步骤3：访问网站
- 自动部署地址：`https://your-username.github.io`
- 支持自定义域名

## 📋 方案2：Netlify（推荐）
**完全免费，支持自动部署，有CDN加速**

### 步骤1：准备项目
确保项目根目录有 `netlify.toml`：

```toml
[build]
  publish = "public"
  command = "hugo --minify"

[build.environment]
  HUGO_VERSION = "0.148.1"
  HUGO_ENV = "production"
  HUGO_ENABLEGITINFO = "true"
```

### 步骤2：部署到Netlify
1. 访问：https://netlify.com
2. 用GitHub账号登录
3. 导入GitHub仓库
4. 自动部署完成！

### 步骤3：访问网站
- 自动分配域名：`https://amazing-name-123.netlify.app`
- 支持自定义域名

## 📋 方案3：Vercel（推荐）
**完全免费，全球CDN，自动HTTPS**

### 步骤1：准备项目
确保项目根目录有 `vercel.json`：

```json
{
  "buildCommand": "hugo --minify",
  "outputDirectory": "public",
  "devCommand": "hugo server -D",
  "installCommand": "curl -L https://github.com/gohugoio/hugo/releases/download/v0.148.1/hugo_extended_0.148.1_Linux-64bit.tar.gz | tar xz && mv hugo /usr/local/bin/"
}
```

### 步骤2：部署到Vercel
1. 访问：https://vercel.com
2. 用GitHub账号登录
3. 导入GitHub仓库
4. 一键部署！

### 步骤3：访问网站
- 自动分配域名：`https://your-project.vercel.app`
- 支持自定义域名

## 🚀 快速部署（5分钟完成）

### 选择GitHub Pages（最简单）
```bash
# 1. 创建GitHub仓库
# 2. 推送代码
cd riboo-temboo
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
git push -u origin main

# 3. 等待5-10分钟
# 4. 访问：https://YOUR_USERNAME.github.io
```

## 🎯 推荐方案对比

| 平台 | 免费额度 | 自定义域名 | CDN | 部署难度 |
|------|----------|------------|-----|----------|
| GitHub Pages | 无限 | ✅ | ✅ | ⭐⭐ |
| Netlify | 100GB/月 | ✅ | ✅ | ⭐ |
| Vercel | 100GB/月 | ✅ | ✅ | ⭐ |

## 🛠️ 部署后功能
- ✅ 全球访问
- ✅ HTTPS自动证书
- ✅ 自动部署（推送代码即更新）
- ✅ 自定义域名支持
- ✅ CDN加速

## 📱 手机访问测试
部署完成后，用手机浏览器访问你的域名即可测试。

## 🔄 更新流程
1. 本地修改内容
2. 推送到GitHub
3. 自动部署更新
4. 全球同步生效

## 🎯 立即开始
**推荐选择GitHub Pages**，5分钟即可完成部署！

需要我帮你选择其中一种方案并详细指导吗？
