#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Markdown文章同步器
将markdown-source文件夹中的markdown文件自动同步到Hugo content/posts/
支持自动提取标题、标签、日期等信息
"""

import os
import sys
import shutil
import re
from datetime import datetime
import yaml

class MarkdownSync:
    def __init__(self, source_dir="markdown-source", target_dir="content/posts"):
        self.source_dir = source_dir
        self.target_dir = target_dir
        self.ensure_directories()
    
    def ensure_directories(self):
        """确保目录存在"""
        os.makedirs(self.source_dir, exist_ok=True)
        os.makedirs(self.target_dir, exist_ok=True)
    
    def extract_metadata(self, content):
        """从markdown内容提取元数据"""
        metadata = {
            'title': '',
            'tags': [],
            'date': datetime.now().strftime('%Y-%m-%d'),
            'categories': ['思考'],
            'draft': False
        }
        
        # 提取标题（第一个#标题）
        title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
        if title_match:
            metadata['title'] = title_match.group(1).strip()
        
        # 提取标签（从内容中的标签行）
        tag_matches = re.findall(r'标签[：:]\s*(.+)$', content, re.MULTILINE)
        if tag_matches:
            tags_str = tag_matches[0]
            tags = [tag.strip() for tag in re.split(r'[,，、]\s*', tags_str)]
            metadata['tags'] = [tag for tag in tags if tag]
        
        # 提取日期（从内容中的日期行）
        date_matches = re.findall(r'日期[：:]\s*(\d{4}-\d{2}-\d{2})', content, re.MULTILINE)
        if date_matches:
            metadata['date'] = date_matches[0]
        
        # 提取分类（从内容中的分类行）
        category_matches = re.findall(r'分类[：:]\s*(.+)$', content, re.MULTILINE)
        if category_matches:
            categories = [cat.strip() for cat in re.split(r'[,，、]\s*', category_matches[0])]
            metadata['categories'] = [cat for cat in categories if cat]
        
        # 如果没有标题，使用文件名
        if not metadata['title']:
            metadata['title'] = "未命名文章"
        
        return metadata
    
    def create_front_matter(self, metadata):
        """创建Hugo front matter"""
        front_matter = {
            'title': metadata['title'],
            'date': f"{metadata['date']}T{datetime.now().strftime('%H:%M:%S')}+08:00",
            'tags': metadata['tags'],
            'categories': metadata['categories'],
            'draft': metadata['draft']
        }
        return yaml.dump(front_matter, allow_unicode=True, default_flow_style=False)
    
    def process_file(self, filename):
        """处理单个markdown文件"""
        source_path = os.path.join(self.source_dir, filename)
        if not filename.endswith('.md'):
            return None
        
        with open(source_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 提取元数据
        metadata = self.extract_metadata(content)
        
        # 生成目标文件名
        slug = re.sub(r'[^\u4e00-\u9fa5a-zA-Z0-9]+', '-', metadata['title'])
        slug = re.sub(r'-+', '-', slug).strip('-')
        target_filename = f"{metadata['date']}-{slug}.md"
        target_path = os.path.join(self.target_dir, target_filename)
        
        # 创建Hugo格式的内容
        front_matter = self.create_front_matter(metadata)
        
        # 移除markdown中的元数据行
        clean_content = content
        clean_content = re.sub(r'^标签[：:].+\n?', '', clean_content, flags=re.MULTILINE)
        clean_content = re.sub(r'^日期[：:].+\n?', '', clean_content, flags=re.MULTILINE)
        clean_content = re.sub(r'^分类[：:].+\n?', '', clean_content, flags=re.MULTILINE)
        
        # 移除标题行（如果存在）
        clean_content = re.sub(r'^#\s+.+?\n', '', clean_content, count=1, flags=re.MULTILINE)
        
        # 组合最终内容
        final_content = f"---\n{front_matter}---\n\n{clean_content.strip()}\n"
        
        # 写入目标文件
        with open(target_path, 'w', encoding='utf-8') as f:
            f.write(final_content)
        
        return target_filename
    
    def sync_all(self):
        """同步所有markdown文件"""
        print("🔄 开始同步markdown文件...")
        
        if not os.path.exists(self.source_dir):
            print(f"📁 创建源文件夹: {self.source_dir}")
            os.makedirs(self.source_dir)
            return
        
        files_processed = 0
        for filename in os.listdir(self.source_dir):
            if filename.endswith('.md'):
                try:
                    target_filename = self.process_file(filename)
                    if target_filename:
                        print(f"✅ 同步: {filename} → {target_filename}")
                        files_processed += 1
                except Exception as e:
                    print(f"❌ 处理 {filename} 时出错: {e}")
        
        if files_processed == 0:
            print("📄 没有找到markdown文件")
            print(f"请将markdown文件放入 {self.source_dir}/ 文件夹中")
        else:
            print(f"🎉 共处理了 {files_processed} 个文件")
    
    def create_sample(self):
        """创建示例markdown文件"""
        sample_content = """# 示例文章：如何写好一篇技术博客

标签: 写作,技术,博客
日期: 2025-07-17
分类: 技术,教程

## 引言

在这个信息爆炸的时代，如何写出有价值的技术博客变得越来越重要...

## 正文内容

### 1. 明确目标读者
在开始写作之前，首先要明确你的目标读者是谁...

### 2. 结构清晰
一篇好的技术博客应该有清晰的结构...

### 3. 代码示例
```python
def hello_world():
    print("Hello, World!")
```

## 总结

写好技术博客需要不断练习和积累...

---

*这是一个示例文件，你可以将其作为模板来创建自己的文章*
"""
        
        sample_path = os.path.join(self.source_dir, "示例文章.md")
        with open(sample_path, 'w', encoding='utf-8') as f:
            f.write(sample_content)
        
        print(f"📝 已创建示例文件: {sample_path}")

def main():
    if len(sys.argv) > 1 and sys.argv[1] == "--sample":
        sync = MarkdownSync()
        sync.create_sample()
    else:
        sync = MarkdownSync()
        sync.sync_all()

if __name__ == "__main__":
    main()
