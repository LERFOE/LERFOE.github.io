# GitHub Pages 设置指南

## 🚀 快速设置步骤

### 1. 创建GitHub仓库
访问：https://github.com/new
- 仓库名：`LERFOE.github.io`
- 设置为公开
- 不要添加README

### 2. 本地配置和部署

#### 方法A：使用GitHub Actions（推荐）
```bash
# 在riboo-temboo目录下执行
cd riboo-temboo

# 初始化git
git init
git remote add origin https://github.com/LERFOE/LERFOE.github.io.git

# 添加所有文件
git add .
git commit -m "Initial website with Hugo"

# 推送到main分支
git push -u origin main
```

#### 方法B：使用部署脚本
```bash
# 一键部署
./deploy-to-lerfoe.sh
```

### 3. 启用GitHub Pages
1. 进入仓库：`Settings > Pages`
2. 选择部署源：`GitHub Actions`
3. 等待2-3分钟生效

### 4. 验证部署
访问：https://lerfoe.github.io/

## 📋 文件结构说明
```
LERFOE.github.io/
├── .github/workflows/deploy.yml  # 自动部署配置
├── content/posts/               # 文章目录
├── themes/riboo-theme/          # 主题文件
├── static/images/               # 静态资源
├── hugo.yaml                    # 网站配置
└── deploy-to-lerfoe.sh          # 部署脚本
```

## 🔄 后续更新
每次修改内容后：
```bash
git add .
git commit -m "更新内容描述"
git push
```

## 🌐 网站地址
- 主站：https://lerfoe.github.io/
- 文章列表：https://lerfoe.github.io/posts/
- 新文章：https://lerfoe.github.io/2025/04/致Ribboo的情书/

## ⚠️ 注意事项
1. 确保仓库名为 `LERFOE.github.io`
2. 仓库必须设置为公开
3. 首次部署可能需要5-10分钟生效
4. 所有内容已配置完成，直接推送即可
