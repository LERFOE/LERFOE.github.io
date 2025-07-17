# Hugo文章格式化器使用指南

## 🚀 快速开始

### 方法1: Python脚本（推荐）
```bash
# 创建新文章
python3 format-article.py "文章标题" "标签1,标签2,标签3"

# 示例
python3 format-article.py "人工智能的未来发展" "AI,技术趋势,未来"
```

### 方法2: Shell脚本
```bash
# 创建新文章
./new-article.sh "文章标题" "标签1,标签2,标签3"

# 示例
./new-article.sh "设计思维的力量" "设计,思维,创新"
```

## 📋 使用步骤

1. **打开终端**，进入项目目录：
   ```bash
   cd riboo-temboo
   ```

2. **创建新文章**：
   ```bash
   python3 format-article.py "你的文章标题" "标签1,标签2,标签3"
   ```

3. **编辑文章**：
   ```bash
   code content/posts/2025-07-17-你的文章标题.md
   ```

4. **预览效果**：
   打开浏览器访问：http://localhost:3000

## 🏷️ 标签使用技巧

- **多个标签**用英文逗号分隔
- **中文标签**直接输入，如："设计,用户体验,色彩理论"
- **英文标签**也可以混合使用，如："design,UX,color-theory"

## 📝 文章模板结构

创建的文章会自动包含：
- ✅ 完整的Hugo front matter
- ✅ 自动生成的文件名
- ✅ 当前日期和时间
- ✅ 预设的文章结构
- ✅ 草稿状态设为false（直接发布）

## 🔄 实时预览

Hugo服务器已经启动，支持热重载：
- 修改文章内容 → 自动刷新
- 添加新文章 → 自动加载
- 修改标签 → 实时更新

## 📁 文件位置

所有文章都保存在：`content/posts/` 目录下
文件名格式：`YYYY-MM-DD-文章标题.md`

## 🎯 示例命令

```bash
# 创建技术文章
python3 format-article.py "React Hooks最佳实践" "React,JavaScript,前端"

# 创建设计文章
python3 format-article.py "极简主义设计原则" "设计,极简主义,用户体验"

# 创建思考文章
python3 format-article.py "数字时代的注意力经济" "社会观察,数字时代,思考"
```

## 🛠️ 故障排除

如果脚本无法运行：
```bash
# 给脚本添加执行权限
chmod +x format-article.py
chmod +x new-article.sh
```

现在你可以开始写作了！🎉
