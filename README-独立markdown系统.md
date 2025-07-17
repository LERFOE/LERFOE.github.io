# 📝 独立Markdown文章系统

## 🎯 系统概述
这是一个专门设计的markdown文章管理系统，让你可以：
- 在独立的 `markdown-source/` 文件夹中写作
- 通过简单脚本自动同步到Hugo网站
- 支持中文标题、标签、分类等元数据
- 实时预览，无需重启服务器

## 🚀 快速开始

### 1. 创建你的第一篇markdown文章
```bash
# 进入项目目录
cd riboo-temboo

# 创建示例文章
python3 sync-markdown.py --sample

# 同步到网站
python3 sync-markdown.py
```

### 2. 写作流程
1. **在markdown-source/文件夹中创建.md文件**
2. **使用简单格式添加元数据**：
   ```markdown
   # 文章标题
   标签: 技术,设计,思考
   日期: 2025-07-17
   分类: 技术教程

   ## 正文内容
   你的文章内容...
   ```
3. **运行同步脚本**：
   ```bash
   python3 sync-markdown.py
   ```
4. **实时预览**：http://localhost:3000

## 📁 文件结构
```
riboo-temboo/
├── markdown-source/          # 你的markdown文件存放处
│   ├── 我的文章1.md
│   ├── 技术分享.md
│   └── 生活感悟.md
├── content/posts/            # Hugo自动生成的文章（不要手动修改）
├── sync-markdown.py          # 同步脚本
└── README-独立markdown系统.md # 本说明文档
```

## 📝 Markdown文件格式

### 基本格式
```markdown
# 文章标题（必须）
标签: 标签1,标签2,标签3
日期: 2025-07-17
分类: 技术,教程

## 引言
在这里写引言...

## 正文
在这里写正文...

## 总结
在这里写总结...
```

### 支持的元数据
- **标题**：从第一个 `#` 标题自动提取
- **标签**：用英文逗号分隔
- **日期**：格式 YYYY-MM-DD
- **分类**：用英文逗号分隔

### 示例文件
`markdown-source/我的技术思考.md`：
```markdown
# 人工智能时代的思考

标签: AI,技术,未来
日期: 2025-07-17
分类: 技术,思考

## 引言
人工智能正在改变我们的世界...

## 技术发展的双刃剑
每一项技术革命都伴随着机遇和挑战...

## 未来展望
我们需要以更加开放的心态拥抱变化...
```

## 🔄 同步命令

### 基本同步
```bash
python3 sync-markdown.py
```

### 创建示例
```bash
python3 sync-markdown.py --sample
```

### 自动同步（推荐）
你可以设置文件监听，实现保存即同步：

#### macOS/Linux
```bash
# 安装fswatch
brew install fswatch

# 监听文件变化
fswatch -o markdown-source/ | while read f; do python3 sync-markdown.py; done
```

#### 使用Python watchdog（可选）
```bash
pip install watchdog
```

## 🎨 高级用法

### 批量导入现有文章
将现有的markdown文件直接复制到 `markdown-source/` 文件夹，然后运行同步脚本即可。

### 自定义模板
在 `markdown-source/` 中创建 `template.md`：
```markdown
# 新文章标题
标签: 待添加
日期: 2025-07-17
分类: 思考

## 引言

## 正文

## 总结
```

### 文件命名
- 源文件：任意中文或英文名称
- 目标文件：自动生成 `YYYY-MM-DD-文章标题.md`

## 🛠️ 故障排除

### 常见问题
1. **中文标题乱码**：确保文件使用UTF-8编码
2. **标签不显示**：检查标签格式是否正确
3. **文章不更新**：确认运行了同步脚本

### 调试模式
```bash
# 查看详细处理过程
python3 -c "
import sync_markdown
sync = sync_markdown.MarkdownSync()
sync.sync_all()
"
```

## 📊 工作流程

### 日常写作流程
1. 打开 `markdown-source/` 文件夹
2. 创建或编辑 `.md` 文件
3. 保存文件
4. 运行 `python3 sync-markdown.py`
5. 浏览器访问 http://localhost:3000 查看效果

### 团队协作
- 所有写作都在 `markdown-source/` 中进行
- 可以配合Git进行版本控制
- 同步脚本会保留原始文件，只生成Hugo需要的格式

## 🎯 最佳实践

1. **保持简单**：在markdown-source中只关注内容
2. **定期同步**：每次写完文章后运行同步脚本
3. **使用版本控制**：将markdown-source加入Git
4. **备份原始文件**：markdown-source中的文件是原始版本

现在你可以开始专注于写作了！🚀
