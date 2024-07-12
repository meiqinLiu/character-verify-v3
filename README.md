一个基于 vue3.js 的字符输入校验插件.

## 使用

### vue-cli

> vue-cli 中使用

1. 首先安装插件

```shell
# npm 安装：
npm install character-verify-v3 -S
```

2. `main.js` 中引入

```js
import CharacterVerify from 'character-verify-v3'
import 'character-verify-v3/lib/CharacterVerify.css'
createApp(App).use(CharacterVerify)
```

3. 组件中声明

```vue
<template>
  <div>
    <CharacterVerify ref="characterVerifyRef" @reload="emitChange('reload')" @success="emitChange('success')" @fail="emitChange('fail')"></CharacterVerify>
  </div>
</template>
```

## 更详细的

### 参数

- **vWidth**: 校验区块宽度, String 类型, 默认 `180px`.
- **vHeight**: 校验区块高度, String 类型, 默认 `50px`.
- **vLength**: 字符长度, Number 类型, 默认 `4`.
- **vFontSize**: 默认字体大小, String 类型, 默认 `30px`.
- **bgPngUrlList**: 背景干扰图案集合, Array 类型, 默认 `默认图库`.
- **inputHeight**: 输入框高度, String 类型, 默认 `35px`.
- **btnContent**: 校验按钮文本, String 类型, 默认 `验证`.
- **btnColor**: 校验按钮颜色, String 类型, 默认 `#1989fa`.
- **sText**: 校验成功的提示, String 类型, 默认 `验证通过`, 传空字符则不弹出.
- **eText**: 校验失败的提示, String 类型, 默认 `验证失败`, 传空字符则不弹出.
- **isShowTip**: 校验结果轻提示, 默认 `true`

### 事件

- **success**: 校验成功时触发.
- **fail**: 校验失败时触发.
- **reload**: 刷新时触发.

### 方法

- **onReset**: 刷新.
