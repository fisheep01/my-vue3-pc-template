module.exports = {
  types: [
    { value: 'feat', name: 'feat:    一个新的功能特性' },
    { value: 'fix', name: 'fix:    修复一个Bug' },
    { value: 'docs', name: 'docs:    变更的只有文档' },
    { value: 'style', name: 'style:    代码格式改动，如换行、分号、引号等' },
    { value: 'refactor', name: 'refactor:    代码重构，注意和feat、fix的区别' },
    { value: 'perf', name: 'perf:    性能优化相关改动' },
    { value: 'test', name: 'test:    添加测试代码' },
    { value: 'chore', name: 'chore:    开发工具变动(构建、脚手架工具等)' },
    { value: 'revert', name: 'revert:    代码回退' },
    { value: 'merge', name: 'merge:    合并代码产生的改变或解决的冲突' },
  ],

  // 可以在这里定义你自己的模块
  scopes: [{ name: 'default' }],

  // override the messages, defaults are as follows
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择一个scope (可选):',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: '短说明:\n',
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?',
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],

  // limit subject length
  subjectLimit: 100,
}
