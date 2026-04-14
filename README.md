# Insight Journal

一个以 **“列表页卡片 + 路由化详情弹层”** 为核心交互的博客主题示例仓库。

这个仓库同时包含两部分：

- **静态 HTML 预览**：用于直接在 GitHub / GitHub Pages 预览界面结构与交互原型。
- **WordPress 主题代码**：用于在真实 WordPress 环境中运行动态模板、评论区、相关文章、分享按钮与详情弹层逻辑。

---

## 1. 主题目标

这个主题不是单纯的博客列表，也不是一个普通弹窗。

它要同时实现两件事：

1. **列表浏览不断流**：用户在卡片列表里阅读文章时，不必每次都整页跳转。
2. **文章仍然有真实 URL**：每篇文章都能被单独访问、分享和收录。

因此主题采用的是 **route-driven modal** 思路：

- 从列表页点击文章时，打开 **全屏详情弹层**。
- 弹层打开后，浏览器地址会切换成这篇文章的真实 permalink。
- 关闭弹层时，返回列表，并恢复之前的滚动位置。
- 如果用户直接打开该 permalink，则显示为正常的 `single.php` 单篇文章页，而不是弹层。

也就是说：

- **URL 是真的**
- **展示方式取决于进入方式**

---

## 2. 弹层详情的实现原理

### 2.1 两种入口，共用同一篇文章

同一篇文章有两种阅读方式：

#### A. 从列表页进入
- 列表卡片里的链接带有 `data-modal-link` 和 `data-post-id`
- 前端脚本 `modal-route.js` 接管点击
- 阻止整页跳转
- 请求自定义 REST 接口 `/wp-json/insight/v1/post/{id}`
- 把返回的数据渲染进全屏弹层
- 使用 `history.pushState()` 把地址改成真实 permalink

#### B. 直接访问 permalink
- WordPress 正常走 `single.php`
- 页面作为独立详情页渲染
- 不显示“关闭弹层”按钮，因为当前没有背景列表上下文可回退

### 2.2 为什么不用“纯弹窗不改地址”

纯弹窗虽然简单，但有几个明显问题：

- 文章链接不可直接复制分享
- 刷新后无法自然恢复状态
- 浏览器前进 / 后退语义不自然
- SEO 与单篇文章访问体验较弱

当前方案的优势是：

- 文章保留真实 URL
- 列表浏览不被打断
- 浏览器后退可以关闭弹层
- 直接访问仍是完整详情页

### 2.3 数据流

#### 1）列表模板输出卡片
由下面这些模板负责：

- `home.php`
- `archive.php`
- `index.php`
- `template-parts/content-card.php`

每张卡片会输出：

- 标题
- 摘要
- 日期
- 分类
- 缩略图
- permalink
- post ID

#### 2）列表页预先挂载空弹层容器
由 `template-parts/content-single-modal.php` 输出：

- 遮罩层
- 面板容器
- 关闭按钮
- 内容挂载区 `#detailWrap`
- 加载态 / 错误态容器

#### 3）前端脚本请求 REST 数据
`assets/js/modal-route.js` 负责：

- 监听卡片点击
- 发起 fetch 请求
- 渲染文章详情
- 渲染作者信息卡
- 渲染分享按钮
- 渲染上一篇 / 下一篇
- 渲染相关文章
- 处理 `pushState` / `popstate`
- 恢复列表滚动位置

#### 4）REST 接口返回弹层所需完整数据
`functions.php` 注册了：

```text
/wp-json/insight/v1/post/{id}
```

接口返回内容包括：

- 标题
- 摘要
- 正文 HTML
- permalink
- 日期
- 阅读时长
- 分类 / 标签
- 特色图
- 作者信息
- 分享链接
- 上一篇 / 下一篇
- 相关文章

---

## 3. 主题当前能力

### 列表与详情
- 卡片式文章列表
- 单篇文章页
- 路由化全屏详情弹层
- 列表点击进入弹层，直接访问进入 `single.php`

### 浏览器行为
- 弹层打开时地址切换为真实 permalink
- 后退关闭弹层
- 前进重新打开对应文章
- 关闭后恢复列表滚动位置

### 文章详情区
- 特色图
- 标题 / 摘要 / 分类 / 日期
- 阅读时长
- 作者信息卡
- 标签区域
- 分享按钮
- 上一篇 / 下一篇导航
- 相关文章推荐

### 评论区
- `comments.php` 评论模板
- 评论列表
- 回复按钮
- 嵌套评论
- 留言表单

### 弹层状态
- 加载态
- 错误态
- 重试按钮
- 失败时可退回普通详情页

---

## 4. 仓库结构

```text
wp-modal-blog-repo/
├─ index.html
├─ README.md
├─ .gitignore
├─ assets/
│  ├─ css/
│  │  └─ style.css
│  └─ js/
│     └─ app.js
└─ theme/
   └─ insight-journal/
      ├─ style.css
      ├─ functions.php
      ├─ header.php
      ├─ footer.php
      ├─ index.php
      ├─ home.php
      ├─ archive.php
      ├─ single.php
      ├─ comments.php
      ├─ searchform.php
      ├─ assets/
      │  ├─ css/
      │  │  └─ theme.css
      │  └─ js/
      │     └─ modal-route.js
      └─ template-parts/
         ├─ content-card.php
         ├─ content-single.php
         └─ content-single-modal.php
```

---

## 5. 文件用途速查

### 根目录：静态预览

| 文件 | 用途 |
|---|---|
| `index.html` | 静态预览入口，演示列表 + 全屏详情弹层 |
| `assets/css/style.css` | 静态预览样式 |
| `assets/js/app.js` | 静态预览交互逻辑：模拟数据、弹层、路由状态、分享与相关文章 |

### WordPress 主题主文件

| 文件 | 用途 |
|---|---|
| `theme/insight-journal/style.css` | 主题头信息与基础入口样式 |
| `theme/insight-journal/functions.php` | 主题支持、资源加载、自定义 REST 接口、阅读时长、分享链接、相关文章数据 |
| `theme/insight-journal/header.php` | 页面头部 |
| `theme/insight-journal/footer.php` | 页面尾部 |
| `theme/insight-journal/home.php` | 博客首页 / 文章列表 |
| `theme/insight-journal/archive.php` | 分类 / 标签 / 归档页 |
| `theme/insight-journal/index.php` | 模板兜底 |
| `theme/insight-journal/single.php` | 单篇文章页 |
| `theme/insight-journal/comments.php` | 评论列表与表单 |
| `theme/insight-journal/searchform.php` | 搜索表单 |

### 主题模板片段

| 文件 | 用途 |
|---|---|
| `template-parts/content-card.php` | 单张文章卡片 |
| `template-parts/content-single.php` | 单篇文章正文、作者卡、分享区、相邻文章、相关文章 |
| `template-parts/content-single-modal.php` | 列表页中的全局弹层壳子 |

### 主题前端资源

| 文件 | 用途 |
|---|---|
| `assets/css/theme.css` | 主题视觉样式 |
| `assets/js/modal-route.js` | 列表页拦截文章点击、请求 REST、渲染弹层、处理历史记录 |

---

## 6. 如何安装主题

### 方法一：直接安装主题 ZIP

1. 打开 WordPress 后台
2. 进入 **外观 → 主题 → 添加主题 → 上传主题**
3. 上传 `theme/insight-journal/` 打包后的 ZIP
4. 安装并启用主题

### 方法二：手动放入主题目录

把目录：

```text
theme/insight-journal/
```

复制到：

```text
wp-content/themes/
```

然后在后台启用 **Insight Journal** 主题。

---

## 7. 安装后建议设置

为了让主题看起来接近预期，建议先完成这些内容准备：

1. 发布几篇文章
2. 给文章设置：
   - 特色图
   - 分类
   - 标签
   - 摘要
3. 在 **设置 → 阅读** 中设置博客首页或最新文章页
4. 在 **设置 → 讨论** 中开启评论（如果你需要评论区）

这样列表卡片、相关文章、相邻文章和评论区都会更完整。

---

## 8. 静态预览与 WordPress 主题的关系

### 静态 HTML 预览负责什么

静态预览只负责演示：

- 卡片网格布局
- 全屏详情弹层结构
- 打开 / 关闭动画与交互逻辑
- URL 查询参数驱动的弹层体验
- 作者卡、分享按钮、相关文章的视觉布局

它不依赖 WordPress，也不具备真实内容管理能力。

### WordPress 主题负责什么

主题部分才是真正可运行的动态版本：

- 文章内容来自 WordPress 数据库
- 卡片列表来自 Loop
- 单篇页来自 `single.php`
- 评论来自 WordPress 评论系统
- 弹层数据来自自定义 REST 接口
- 相关文章与相邻文章根据真实文章数据生成

---

## 9. REST 接口说明

主题注册了一个自定义接口：

```text
/wp-json/insight/v1/post/{id}
```

这个接口的用途是：

- 给列表页弹层提供“单篇详情数据”
- 避免在打开弹层时整页刷新

返回字段大致包括：

- `id`
- `title`
- `excerpt`
- `content`
- `permalink`
- `date`
- `reading_time`
- `categories`
- `tags`
- `featured_image`
- `author`
- `share`
- `adjacent`
- `related`

这样前端只需要请求一次，就能把弹层详情完整渲染出来。

---

## 10. 后续扩展建议

这套主题现在已经具备“展示型博客主题”的核心骨架。后续可以继续扩展：

- 搜索结果页增强
- 分类筛选与标签筛选
- 404 页面与空状态页
- 文章目录（TOC）
- 暗色 / 浅色主题切换
- AJAX 评论提交
- 阅读进度条
- 自定义文章类型支持

---

## 11. 适用场景

这个主题特别适合以下类型的网站：

- 设计 / 开发博客
- 研究笔记型博客
- 产品更新日志站点
- 杂志风文章站
- 需要兼顾“浏览连续性”和“真实文章链接”的内容站

如果你的核心诉求是：

- 列表页浏览流畅
- 文章详情可分享
- 详情既能弹层展示，也能独立访问

那么这套结构就是比较合适的起点。
