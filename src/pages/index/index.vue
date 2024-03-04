<template>
    <!-- 资源注册 -->
    <resources></resources>
    <!-- 员工注册 -->
    <employees v-if="false"></employees>
    <!-- 商家注册 -->
    <merchants v-if="false"></merchants>
    <!--合伙人注册-->
    <partner v-if="false"></partner>
</template>

<script setup>
import { provide } from 'vue'
import { pageJs } from './index.js'
import resources from './register/recources/resources.vue';
import employees from './register/employees/employees.vue';
import merchants from './register/merchants/merchants.vue';
import partner from './register/partner/partner.vue';


const __pageData = pageJs();
const { imgs } = __pageData;
provide('__pageData', __pageData);

</script>

