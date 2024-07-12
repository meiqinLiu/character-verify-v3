<template>
  <div class="about">
    <CharacterVerify ref="characterVerifyRef" @success="success" @fail="fail">
      <!-- <template #reloadBtn="props">
        <span>刷新 {{ props.disabled }}</span>
      </template> -->
    </CharacterVerify>

    <button @click="reload">刷新</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
export default defineComponent({
  setup() {
    const characterVerifyRef = ref();
    const state = reactive({
      isShowSelf: true,
      width: 300,
      height: 180,
      isBorder: true,
      imgUrl: "",
      isCloseBtn: true,
      isReloadBtn: true,
      isParentNode: false,
      isShowTip: true,
    });

    const success = () => {
      console.log("success");
      characterVerifyRef.value.onReset();
    };
    const fail = () => {
      console.log("fail");
    };
    const reload = () => {
      characterVerifyRef.value.onReset();
    };
    return {
      ...toRefs(state),
      characterVerifyRef,
      success,
      fail,
      reload,
    };
  },
});
</script>
<style lang="less">
.opreation {
  display: flex;

  span {
    margin-left: 20px;
  }
}
</style>
