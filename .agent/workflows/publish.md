---
description: 發布 NPM 套件到 Registry
---

# IconForge 發佈流程

執行以下步驟將套件發佈到 NPM：

// turbo
1. 執行程式碼品質檢查：

```bash
pnpm lint && pnpm typecheck
```

// turbo
2. 確認 NPM 登入狀態：

```bash
npm whoami
```

如果未登入或 Token 過期，提醒使用者手動執行 `npm login`。

3. 建置所有套件：

```bash
pnpm build
```

4. 確認版本號正確 (檢查 `packages/*/package.json`)

5. **更新 CHANGELOG.md**：
   - 記錄此版本的所有變更
   - 確保標題格式正確 `## [X.X.X] - YYYY-MM-DD`

6. 提交版本與功能變更，建立 Git Tag：

> **注意**：不需提交 AI 輔助用的 .md 文件 (如 GEMINI.md, iconforge-costar.md 等)

```bash
git add packages/ examples/ CHANGELOG.md
git commit -m "chore(release): 發布 vX.X.X"
git tag vX.X.X
git push && git push --tags
```

// turbo
7. 模擬發佈 (Dry Run)：

```bash
pnpm publish --recursive --access public --no-git-checks --dry-run
```

8. 正式發佈：

```bash
pnpm publish --recursive --access public --no-git-checks
```

// turbo
9. 驗證發佈成功：

```bash
npx @iconforge/cli@latest --version
```

10. 在 GitHub 建立 Release，附上 CHANGELOG 內容