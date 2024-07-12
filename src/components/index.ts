import {App} from 'vue'
import CharacterVerify from './CharacterVerify/index.vue'

const install = function(app: App): void {
  app.component(CharacterVerify.name, CharacterVerify)
}

export {install}

// 默认导出 install
export default {
  install,
}
