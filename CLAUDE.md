# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此代码库中工作时提供指导。

## 项目概述

**Prompt Fill** 是一个专为 AI 绘画工具（Midjourney、GPT、Nano Banana）设计的结构化提示词生成工具。它使用可视化的"填空"界面，模板中的 `{{variable}}` 语法会自动转换为可交互的下拉菜单。

**技术栈**: React 18, Vite 5, Tailwind CSS 3.4, Tauri 2（桌面端）

## 开发命令

```bash
# 启动开发服务器（端口 1420）
npm run dev

# 启动并自动打开浏览器
npm run dev:open

# 构建生产版本（包含数据同步）
npm run build

# 同步数据：将 src/data/*.js 转换为 public/data/*.json
npm run sync-data

# 代码检查
npm run lint

# 预览生产构建
npm run preview
```

**重要提示**：修改 `src/data/` 中的数据文件后，务必运行 `npm run build`（或至少运行 `npm run sync-data`）。

## 架构设计

### 版本系统（关键）

项目采用**双版本号机制** - 在修改代码前必须理解：

1. **应用版本** (`package.json`, `src/App.jsx:APP_VERSION`)：UI/逻辑/功能变更时升级。需要重新部署。
2. **数据版本** (`src/data/templates.js:SYSTEM_DATA_VERSION`)：仅在定稿模板/词库变更用于生产时升级。触发用户更新通知。

**工作流程**：开发期间可以随意修改模板。只在准备推送到 git 时才增加 `SYSTEM_DATA_VERSION`。

### 数据流架构

```
src/data/*.js（唯一真实源）
    ↓ npm run sync-data
public/data/*.json（Web 分发）
    ↓ 手动上传
后端服务器 /www/wwwroot/promptfillapi/data/
```

应用会优先从后端获取 JSON（如果可用），否则降级使用本地打包数据。这使得云端模板更新无需重新部署应用。

### 状态管理模式

- **useStickyState**：封装 localStorage 的自定义 Hook，API 类似 useState
- **useEditorHistory**：模板编辑的撤销/重做功能
- **useTemplateManagement**：模板的增删改查操作
- **useLinkageGroups**：同步相同组 ID 的变量（例如 `{{color}}_1` 变量保持同步）

### 关键目录

- `src/components/`：按功能组织的 UI 组件（editor/、mobile/、modals/、preview/）
- `src/data/`：源数据文件（templates.js、banks.js）- 始终在此编辑，然后同步
- `src/hooks/`：有状态逻辑的自定义 React Hooks
- `src/constants/`：翻译、配色方案、应用级常量
- `src/utils/`：辅助函数（helpers.js 包含核心工具）
- `public/data/`：自动生成的 JSON 文件（请勿手动编辑）

### 双语系统

所有面向用户的内容使用双语对象：`{ cn: "中文", en: "English" }`。这适用于：
- 模板内容
- 变量标签
- 词库选项
- UI 文本

辅助函数 `getByLanguage(content, lang)` 位于 `src/utils/helpers.js`，用于提取对应语言的内容。

### 模板系统

模板是嵌入变量的 Markdown。语法 `{{variable_name}}` 在预览模式下会自动转换为可交互的下拉菜单。

**联动组**：变量可以使用数字后缀共享状态。示例：`{{color}}_1` 多次出现时，用户修改值后会保持同步。

### 路径别名

在 vite.config.js 中，`@/` 被别名为 `src/`。使用它来获得清晰的导入路径。

## 发布流程

详细步骤见 `release_checklist.md`。关键点：

1. 增加相应的版本号
2. 运行 `npm run sync-data`
3. 将 `public/data/*.json` 上传到后端服务器
4. 更新桌面端和移动端设置组件中的更新日志
5. Git push 触发 Vercel 部署

## 模板创建指南

详细指南见 `skills.md`。核心规则：

- 使用 `{{variable_name}}` 语法（小写加下划线）
- 创建新变量前先检查 `src/data/banks.js` - 复用现有变量
- 保持模板变量数量最少，除非是高细节场景
- 在 `src/data/templates.js` 顶部定义内容常量
- ID 必须唯一，模板使用 `tpl_` 前缀

## 配置

### 私有分享服务器（可选）

创建 `.env` 文件：
```
VITE_SHARE_API_URL=https://your-api.com/api/share
```

如果省略，应用会降级为长链接分享（离线可用，无需服务器）。

## 移动端优化

应用在 `src/components/mobile/` 中有专用移动端组件。主要差异：
- 使用抽屉菜单而非侧边栏
- 触摸优化的交互
- 响应式布局和断点

在移动端修改时务必在小视口上测试。
