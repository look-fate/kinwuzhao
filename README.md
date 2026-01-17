# **五兆 Kinwuzhao 堅五兆**

[![image](https://github.com/kentang2017/kinwuzhao/blob/main/pic/wuzhao.png)](https://kinwuzhao.streamlit.app/)

> 🎉 **新功能**: 现已提供 [TypeScript版本](#typescript-版本) 供开发者集成使用！

## 📖 项目概览

本项目提供两个版本：
- **Python版本** (当前目录): Streamlit Web应用，带图形界面
- **TypeScript版本** (`kinwuzhao-ts/`): 现代化的TypeScript库，可作为NPM包使用

详细项目结构请查看 [PROJECT_STRUCTURE.zh-CN.md](./PROJECT_STRUCTURE.zh-CN.md)

---

## Python 版本

### 1. 導讀 Introduction
五兆是漢語詞彙中記載的古代占卜方法，其核心定義源自《舊唐書·太宗紀上》。該方法在唐宋文獻中多次出現，如宋代梅堯臣《江南雜感》詩及趙彥衛《雲麓漫鈔》均提及其實踐方式，敦煌出土文獻則保存了唐代五兆卜法的具體操作流程與卦象解析文本。現代漢語詞典將其歸類為五字頭詞語，並保持"古代占卜法"的釋義一致性。作為唐代主流占卜術之一，五兆與龜卜、易占並列於官方記載。宋代趙彥衛在《雲麓漫鈔》中明確記載其操作特徵：「折竹彈占謂之五兆」，梅堯臣詩作「五兆中開卦」則印證了該術在士大夫階層的應用。敦煌文獻P.2859《五兆要訣略》等寫本系統保存了蔔卜製作、占卜儀軌及卦辭體系。

### 2. 安裝套件 Installation
直接把本目錄下載，然後使用python執行。

```bash
pip install -r requirements.txt
```

### 3. 起課方式 Quickstart

运行Web应用：
```bash
streamlit run app.py
```

然后在浏览器中打开: http://localhost:8501

---

## TypeScript 版本

### 📦 特点

- ✅ 完整TypeScript类型定义
- ✅ 支持ESM和CommonJS
- ✅ 46个单元测试，100%通过
- ✅ 可作为NPM包使用
- ✅ 适合集成到前端/后端项目

### 🚀 快速开始

```bash
cd kinwuzhao-ts

# 安装依赖
pnpm install

# 运行测试
pnpm test

# 构建
pnpm build
```

### 💻 使用示例

```typescript
import { ganZhi, findCurrentJieQi, ganzhiPaiPan } from 'kinwuzhao';

// 获取干支
const gz = ganZhi(2025, 6, 27, 11, 24);
// { year: '乙巳', month: '壬午', day: '丁卯', hour: '丙午', minute: '甲子' }

// 获取节气
const jq = findCurrentJieQi(2025, 6, 27, 11, 24);
// '夏至'

// 五兆排盘
const result = ganzhiPaiPan(gz, 0, jq, '五');
console.log(result.兆);  // 兆宫信息
```

### 📚 详细文档

- [完整文档](./kinwuzhao-ts/README.zh-CN.md)
- [快速开始指南](./kinwuzhao-ts/QUICKSTART.zh-CN.md)
- [迁移说明](./kinwuzhao-ts/MIGRATION.zh-CN.md)
- [项目结构说明](./PROJECT_STRUCTURE.zh-CN.md)

---

## 📖 参考文献

- 《舊唐書·太宗紀上》
- 宋代梅堯臣《江南雜感》
- 趙彥衛《雲麓漫鈔》
- 敦煌文獻 P.2859《五兆要訣略》

## 📄 许可证

MIT License
