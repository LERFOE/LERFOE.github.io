#!/bin/bash
# 一键部署到GitHub Pages
# 适用于GitHub用户名：LERFOE

echo "🚀 开始部署到GitHub Pages..."
echo "GitHub用户名：LERFOE"

# 检查是否在riboo-temboo目录
if [ ! -f "hugo.yaml" ]; then
    echo "❌ 请在riboo-temboo目录中运行此脚本"
    exit 1
fi

# 配置GitHub仓库
REPO_NAME="LERFOE.github.io"
GITHUB_URL="https://github.com/LERFOE/LERFOE.github.io.git"

# 初始化Git仓库（如果不存在）
if [ ! -d ".git" ]; then
    echo "📁 初始化Git仓库..."
    git init
    git config --global init.defaultBranch main
fi

# 配置Git
git config user.name "LERFOE"
git config user.email "your-email@example.com"

# 添加远程仓库
git remote remove origin 2>/dev/null || true
git remote add origin $GITHUB_URL

# 添加所有文件
echo "📦 添加文件到Git..."
git add .
git commit -m "Initial deployment: 后现代性主题网站" || echo "没有文件变更"

# 创建并切换到main分支
git branch -M main

# 推送到GitHub
echo "🔄 推送到GitHub..."
git push -u origin main --force

echo ""
echo "✅ 部署完成！"
echo ""
echo "🌐 你的网站地址："
echo "   https://lerfoe.github.io"
echo ""
echo "📋 后续更新："
echo "   每次修改后运行："
echo "   git add . && git commit -m '更新内容' && git push"
echo ""
echo "⏱️  等待5-10分钟后访问网站"
echo "📝 网站将自动部署并全球可访问！"
