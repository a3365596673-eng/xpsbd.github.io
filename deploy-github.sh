#!/bin/bash
# GitHub Pages 一键部署脚本
# 使用方法：先创建 GitHub 仓库，然后运行此脚本

set -e

REPO_URL="${1}"
if [ -z "$REPO_URL" ]; then
  echo "用法: bash deploy-github.sh git@github.com:你的用户名/仓库名.git"
  echo "例如: bash deploy-github.sh git@github.com:xpsbd/xpsbd.github.io.git"
  exit 1
fi

echo "=== 部署 XPSBD 到 GitHub Pages ==="
echo "目标仓库: $REPO_URL"
echo ""

git remote add origin "$REPO_URL" 2>/dev/null || git remote set-url origin "$REPO_URL"
git branch -M main
git push -u origin main

echo ""
echo "✅ 推送完成！接下来："
echo "1. 打开 GitHub 仓库 Settings → Pages"
echo "2. Source 选 'Deploy from a branch' → branch: main"
echo "3. Custom domain 填入: xpsbd.com"
echo "4. 去域名 DNS 后台添加 CNAME 记录:"
echo "   xpsbd.com → 你的用户名.github.io"
echo ""
echo "网站将在几分钟内上线: https://xpsbd.com"
