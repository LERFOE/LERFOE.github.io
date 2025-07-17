#!/bin/bash

# 部署到 LERFOE.github.io 的脚本
# 使用前请确保：
# 1. 已安装 Hugo
# 2. 已配置 GitHub 仓库
# 3. 已设置 GitHub Pages

echo "🚀 开始部署到 LERFOE.github.io..."

# 设置变量
REPO_URL="https://github.com/LERFOE/LERFOE.github.io.git"
BRANCH="main"

# 构建网站
echo "📦 构建网站..."
hugo --minify

# 检查构建是否成功
if [ $? -ne 0 ]; then
    echo "❌ 构建失败，请检查错误"
    exit 1
fi

# 进入public目录
cd public

# 初始化git仓库（如果还没有）
if [ ! -d ".git" ]; then
    echo "📝 初始化Git仓库..."
    git init
    git remote add origin $REPO_URL
fi

# 添加所有文件
echo "📁 添加文件到Git..."
git add .

# 提交更改
COMMIT_MSG="Deploy site: $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$COMMIT_MSG" --allow-empty

# 推送到GitHub
echo "🚀 推送到GitHub..."
git push -f origin main

# 返回原目录
cd ..

echo "✅ 部署完成！"
echo "🌐 网站地址：https://lerfoe.github.io/"
echo ""
echo "📋 部署说明："
echo "1. 确保您有LERFOE.github.io仓库的写入权限"
echo "2. 首次使用可能需要配置Git凭据"
echo "3. 网站将在几分钟内生效"
