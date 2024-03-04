<template>
    <view class="form_item" @click="itemHandler">
        <view class="item_label">{{ label }}</view>
        <view class="input">
            <!--
                由于编译原因获取不到children的内容<slot>根目录只能用div不能用view
                <FormItem>
                    <template v-if>
                        <div>
                            <view></view>
                        </div>
                    </template>
</FormItem>
-->

            <slot></slot>
            <view class="placeholder" v-if="!receiving_content"> {{ placeholder }}</view>
        </view>
        <view class="icon_wrap">
            <view class="arrow_right" :class="iconClass"></view>
        </view>
    </view>
</template>

<script setup>

import { computed, ref, useSlots } from 'vue'
const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    //是否需要右箭头切换的过渡，也有可能直接跳转链接
    iconClass: {
        type: String,
        default: ''
    },

})

const emits = defineEmits(['click'])
const _slots = useSlots();
const receiving_content = computed(() => {
    if (_slots?.default) {
        const result = _slots?.default()[0].children;
        return (typeof result === 'string' && result !== '' && result != 'v-if') || (Array.isArray(result) && result?.length > 0) ?
            true : false;
    }
    return false;
});

function itemHandler(e) {
    emits('click', e)
}

</script>

<style scoped lang="scss">
@import './formItem.scss';
</style>