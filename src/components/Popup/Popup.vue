<template>
  <view class="mask" :class="showClass" @click="(e) => { $emit('maskClick', e) }"></view>
  <view :class="['wrapper_' + mode, showClass]" :style="wrapperStyle">
    <slot>
      <view :class="mode + '_body'">&nbsp; </view>
    </slot>
  </view>
</template>

<script setup>

import { reactive } from 'vue';
const props = defineProps({
  mode: {
    type: String,
    default: () => "center",
  },
  showClass: {
    type: String,
    default: () => "",
  },
  bgColor: {
    type: String,
    default: '#ffffff'
  },
  //是否需要底部安全距离  只在mode为bottom时有效
  bottomSafe: {
    type: Boolean,
    default: false
  }
});
//获取底部安全距离
const __bottomSafe = Math.max(uni.getSystemInfoSync().safeAreaInsets.bottom - 10, 0);

const emits = defineEmits(['maskClick'])


const wrapperStyle = reactive({
  'background': props.bgColor,
  'padding-bottom': (props.mode == 'bottom' && props.bottomSafe) ? __bottomSafe + 'px' : 0
})


</script>

<style scoped lang="scss">
@import "./popup.scss";
</style>



