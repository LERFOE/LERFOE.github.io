# 同步更改到GitHub指南

## 🚀 快速同步步骤

### 方法1：使用Git命令（推荐）
```bash
# 进入项目目录
cd riboo-temboo

# 添加所有更改
git add .

# 提交更改
git commit -m "feat: 旋转背景图180度"

# 推送到GitHub
git push origin main
```

### 方法2：一键部署脚本
```bash
# 使用部署脚本
./deploy-to-lerfoe.sh
```

### 方法3：首次推送（如果还没推送过）
```bash
# 首次设置
cd riboo-temboo
git init
git remote add origin https://github.com/LERFOE/LERFOE.github.io.git
git add .
git commit -m "feat: 更新背景图旋转180度"
git push -u origin main
```

## 📋 同步状态检查
1. **查看更改状态**：
   ```bash
   git status
   ```

2. **查看具体更改**：
   ```bash
   git diff
   ```

3. **强制推送（如果需要）**：
   ```bash
   git push -f origin main
   ```

## 🔄 自动同步
GitHub Actions会自动检测main分支的更改并重新部署网站。通常需要2-3分钟生效。

## ✅ 验证同步
访问：https://lerfoe.github.io/ 查看背景图是否已旋转180度。

## ⚠️ 注意事项
- 确保已配置GitHub仓库权限
- 如果提示权限错误，检查GitHub Actions设置
- 首次推送可能需要几分钟生效
