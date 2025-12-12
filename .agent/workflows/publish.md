---
description: 發布 NPM 套件到 Registry
---

# IconForge 發佈流程

執行以下步驟將套件發佈到 NPM：

// turbo
1. 確認 NPM 登入狀態：

```bash
npm whoami
```

如果未登入或 Token 過期，執行 `npm login`。

// turbo
2. 建置所有套件：

```bash
pnpm build
```

3. 確認版本號正確 (檢查 `packages/*/package.json`)

4. **更新 CHANGELOG.md**：
   - 記錄此版本的所有變更
   - 確保標題格式正確 `## [X.X.X] - YYYY-MM-DD`

5. 提交所有變更並建立 Git Tag：

```bash
git add .
git commit -m "chore(release): 發布 vX.X.X"
git tag vX.X.X
git push && git push --tags
```

// turbo
6. 模擬發佈 (Dry Run)：

```bash
pnpm publish --recursive --access public --no-git-checks --dry-run
```

7. 正式發佈：

```bash
pnpm publish --recursive --access public --no-git-checks
```

// turbo
8. 驗證發佈成功：

```bash
npx @iconforge/cli@latest --version
```

9. 在 GitHub 建立 Release，附上 CHANGELOG 內容