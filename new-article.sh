#!/bin/bash

# Hugo文章格式化器
# 使用方法: ./new-article.sh "文章标题" "标签1,标签2,标签3"

# 检查参数
if [ $# -lt 1 ]; then
    echo "使用方法: ./new-article.sh \"文章标题\" \"标签1,标签2,标签3\""
    exit 1
fi

TITLE=$1
TAGS=${2:-""}
DATE=$(date +"%Y-%m-%d")
FILENAME=$(echo "$TITLE" | iconv -t ascii//TRANSLIT | sed -E 's/[^a-zA-Z0-9]+/-/g' | sed -E 's/^-|-$//g' | tr '[:upper:]' '[:lower:]')

# 创建文章文件
ARTICLE_PATH="content/posts/${DATE}-${FILENAME}.md"

# 格式化标签
IFS=',' read -ra TAG_ARRAY <<< "$TAGS"
TAGS_FORMATTED=""
for tag in "${TAG_ARRAY[@]}"; do
    tag=$(echo "$tag" | xargs) # 去除空格
    if [ -n "$tag" ]; then
        TAGS_FORMATTED="$TAGS_FORMATTED  - $tag"$'\n'
    fi
done

# 创建文章模板
cat > "$ARTICLE_PATH" << EOF
---
title: "$TITLE"
date: ${DATE}
tags: [${TAGS}]
categories: ["思考"]
draft: false
---

# 在这里开始写你的文章...

## 引言

在这里写下你的文章引言...

## 正文

在这里写下你的文章内容...

## 结语

在这里写下你的总结...
EOF

echo "✅ 文章已创建: $ARTICLE_PATH"
echo "📁 文件路径: $ARTICLE_PATH"
echo "🏷️  标签: $TAGS"
echo ""
echo "现在你可以:"
echo "1. 编辑文章: code $ARTICLE_PATH"
echo "2. 预览网站: http://localhost:3000"
echo "3. 发布文章: 将 draft 改为 false"
EOF

chmod +x riboo-temboo/new-article.sh
