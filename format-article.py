#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Hugo文章格式化器
使用方法: python3 format-article.py "文章标题" "标签1,标签2,标签3"
"""

import sys
import os
from datetime import datetime
import re

def slugify(text):
    """将中文标题转换为URL友好的文件名"""
    # 移除特殊字符，保留中文、英文、数字和空格
    text = re.sub(r'[^\u4e00-\u9fa5a-zA-Z0-9\s]', '', text)
    # 将空格替换为连字符
    text = re.sub(r'\s+', '-', text.strip())
    return text.lower()

def create_article(title, tags_str=""):
    """创建新的Hugo文章"""
    date_str = datetime.now().strftime("%Y-%m-%d")
    
    # 处理标签
    tags = []
    if tags_str:
        tags = [tag.strip() for tag in tags_str.split(",") if tag.strip()]
    
    # 生成文件名
    filename = f"{date_str}-{slugify(title)}.md"
    filepath = os.path.join("content", "posts", filename)
    
    # 确保目录存在
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    
    # 创建文章模板
    front_matter = f"""---
title: "{title}"
date: {date_str}T{datetime.now().strftime("%H:%M:%S")}+08:00
tags: {str(tags) if tags else "[]"}
categories: ["思考"]
draft: false
---

# {title}

## 引言

在这里写下你的文章引言...

## 正文

在这里写下你的文章内容...

### 第一部分

详细内容...

### 第二部分

详细内容...

## 结语

在这里写下你的总结...

---

*发布于 {date_str}*
"""
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(front_matter)
    
    return filepath, filename

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("使用方法: python3 format-article.py \"文章标题\" \"标签1,标签2,标签3\"")
        print("示例: python3 format-article.py \"人工智能的未来\" \"AI,技术,未来\"")
        sys.exit(1)
    
    title = sys.argv[1]
    tags = sys.argv[2] if len(sys.argv) > 2 else ""
    
    filepath, filename = create_article(title, tags)
    
    print("✅ 文章创建成功！")
    print(f"📁 文件路径: {filepath}")
    print(f"🏷️  标签: {tags}")
    print("")
    print("现在你可以:")
    print(f"1. 编辑文章: code {filepath}")
    print("2. 预览网站: http://localhost:3000")
    print("3. 文章会自动热重载，无需重启服务器")
