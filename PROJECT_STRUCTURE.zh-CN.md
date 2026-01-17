# 五兆 (Kinwuzhao) 项目结构说明

## 📁 项目组织

本项目现在包含两个独立的实现：

```
kinwuzhao/
├── README.md                    # 项目总览（Python版本说明）
├── app.py                       # Python Streamlit Web应用
├── config.py                    # Python配置模块
├── jieqi.py                     # Python节气计算模块
├── kinwuzhao.py                 # Python五兆排盘核心
├── requirements.txt             # Python依赖
├── .streamlit/                  # Streamlit配置
├── pic/                         # 图片资源
├── PROJECT_STRUCTURE.zh-CN.md   # 本文档
│
└── kinwuzhao-ts/                # ⭐ TypeScript实现
    ├── README.zh-CN.md          # TypeScript版本完整文档
    ├── QUICKSTART.zh-CN.md      # 快速开始指南
    ├── MIGRATION.zh-CN.md       # 迁移说明
    ├── CONVERSION_COMPLETE.md   # 转换完成总结
    ├── package.json             # NPM包配置
    ├── tsconfig.json            # TypeScript配置
    ├── src/                     # TypeScript源代码
    │   ├── index.ts             # 主入口
    │   ├── constants.ts         # 常量定义
    │   ├── utils.ts             # 工具函数
    │   ├── ganzhi.ts            # 干支计算
    │   ├── jieqi.ts             # 节气计算
    │   ├── kinwuzhao.ts         # 五兆排盘核心
    │   └── *.test.ts            # 测试文件
    ├── examples/                # 示例代码
    │   ├── basic.ts             # 基本用法
    │   └── advanced.ts          # 高级用法
    └── dist/                    # 构建输出
        ├── index.js             # ESM模块
        ├── index.cjs            # CommonJS模块
        └── index.d.ts           # TypeScript类型定义
```

## 🔄 两个版本对比

### Python版本 (根目录)

**位置**: `/`

**特点**:
- ✅ 完整的Streamlit Web应用
- ✅ 图形化界面
- ✅ 原始实现，功能完整
- ✅ 适合直接运行和演示

**使用**:
```bash
# 安装依赖
pip install -r requirements.txt

# 运行Web应用
streamlit run app.py
```

**文档**: `README.md`

---

### TypeScript版本 (kinwuzhao-ts/)

**位置**: `/kinwuzhao-ts/`

**特点**:
- ✅ 现代TypeScript库
- ✅ 完整类型定义
- ✅ 单元测试覆盖（46个测试）
- ✅ 支持ESM和CommonJS
- ✅ 可作为NPM包使用
- ✅ 适合集成到其他项目

**使用**:
```bash
cd kinwuzhao-ts

# 安装依赖
pnpm install

# 运行测试
pnpm test

# 构建
pnpm build

# 测试构建结果
node test-built.mjs
```

**文档**: 
- `kinwuzhao-ts/README.zh-CN.md` - 完整文档
- `kinwuzhao-ts/QUICKSTART.zh-CN.md` - 快速开始
- `kinwuzhao-ts/MIGRATION.zh-CN.md` - 迁移说明

## 🎯 使用场景

### 选择Python版本的场景：

1. **需要图形界面**: 使用Streamlit Web应用
2. **快速演示**: 直接运行`streamlit run app.py`
3. **学习和研究**: 参考原始实现
4. **独立应用**: 作为独立工具使用

### 选择TypeScript版本的场景：

1. **集成到前端项目**: React、Vue、Angular等
2. **Node.js后端服务**: Express、Nest.js等
3. **NPM包发布**: 供其他开发者使用
4. **类型安全**: 需要TypeScript类型检查
5. **现代工具链**: 使用ESM、构建工具等

## 📦 作为库使用

### TypeScript/JavaScript项目

```bash
cd kinwuzhao-ts
pnpm install
pnpm build

# 然后在你的项目中
npm install /path/to/kinwuzhao-ts
```

```typescript
import { ganZhi, findCurrentJieQi, ganzhiPaiPan } from 'kinwuzhao';

const gz = ganZhi(2025, 6, 27, 11, 24);
const jq = findCurrentJieQi(2025, 6, 27, 11, 24);
const result = ganzhiPaiPan(gz, 0, jq, '五');
```

### Python项目

```python
from kinwuzhao import gangzhi_paipan
from config import gangzhi
from jieqi import jq

gz = gangzhi(2025, 6, 27, 11, 24)
jieqi = jq(2025, 6, 27, 11, 24)
result = gangzhi_paipan(gz, 0, jieqi, "五")
```

## 🔧 开发

### Python版本开发

```bash
# 安装依赖
pip install -r requirements.txt

# 运行应用
streamlit run app.py

# 或直接运行Python脚本
python kinwuzhao.py
```

### TypeScript版本开发

```bash
cd kinwuzhao-ts

# 开发模式（自动重新构建）
pnpm dev

# 运行测试（watch模式）
pnpm test:watch

# 类型检查
pnpm type-check

# 代码格式化
pnpm format

# Linting
pnpm lint
```

## 📊 功能完整性

两个版本都实现了完整的五兆占卜功能：

| 功能 | Python | TypeScript |
|-----|--------|-----------|
| 干支计算 | ✅ | ✅ |
| 节气计算 | ✅ | ✅ |
| 五兆随机排盘 | ✅ | ✅ |
| 干支起盘 | ✅ | ✅ |
| Web界面 | ✅ | ❌ |
| 类型定义 | ❌ | ✅ |
| 单元测试 | ❌ | ✅ |
| NPM包支持 | ❌ | ✅ |

## 🚀 快速开始

### 只想使用Web界面？

```bash
pip install -r requirements.txt
streamlit run app.py
```

然后在浏览器中打开: http://localhost:8501

### 想要集成到TypeScript/JavaScript项目？

```bash
cd kinwuzhao-ts
pnpm install
pnpm build
```

查看 `kinwuzhao-ts/README.zh-CN.md` 了解详细API文档。

## 📚 更多信息

- **Python版本**: 查看根目录 `README.md`
- **TypeScript版本**: 查看 `kinwuzhao-ts/README.zh-CN.md`
- **快速开始**: 查看 `kinwuzhao-ts/QUICKSTART.zh-CN.md`
- **迁移说明**: 查看 `kinwuzhao-ts/MIGRATION.zh-CN.md`

## 🤝 贡献

欢迎对两个版本都提交PR和Issue！

## 📄 许可证

MIT License

---

**最后更新**: 2026年1月17日
