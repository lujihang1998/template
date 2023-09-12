// commitlint.config.js
// 文件格式要是UTF-8，否则commit 的时候会提示 commitlint 文件有问题(https://blog.csdn.net/m0_47195133/article/details/128640591)
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build", // 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）
        "chore", // 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）
        "ci", // 修改 CI 配置、脚本
        "docs", // 文档变更
        "feat", // 新增功能
        "fix", // 修复缺陷
        "perf", // 性能优化
        "refactor", // 代码重构（不包括 bug 修复、功能新增）
        "revert", // 回滚 commit
        "style", // 代码格式（不影响功能，例如空格、分号等格式修正）
        "test" // 添加疏漏测试或已有测试改动
      ]
    ],
    "subject-case": [0] // subject大小写不做校验
  }
}
