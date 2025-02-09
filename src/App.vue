<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {ref} from 'vue'

const collapsed = ref(false)
</script>

<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed" style="background: #fff" width="150">
      <!--      <div class="logo" @click="()=> collapsed = !collapsed">-->
      <!--        <img src="./assets/logo.svg" alt="" width="40px" height="40px"/>-->
      <!--      </div>-->
      <a-menu theme="light" mode="inline" :defaultSelectedKeys="['1']">
        <a-menu-item key="1">
          <router-link to="/grid">
            <a-icon type="picture"/>
            <span title="结尾不齐，而且会隐藏图片">Grid方式</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/self">
            <a-icon type="folder-open"/>
            <span>自行布局方式</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link to="/unit">
            <a-icon type="folder-open"/>
            <span>单元方式</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <router-link to="/muti-row">
            <a-icon type="folder-open"/>
            <span>跨行方式</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content>
        <div :style="{ padding: '14px', background: '#fff', minHeight: '360px' }">
          <router-view/>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
</style>
