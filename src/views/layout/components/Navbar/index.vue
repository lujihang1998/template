<script setup lang="ts">
  import { logout } from '@/utils/login'
  import BreadCrumb from './BreadCrumb.vue'
  import useAppStore from '@/stores/modules/app'
  import useUserStore from '@/stores/modules/user'
  import { loadLanguageAsync } from '~/i18n'

  defineOptions({ name: 'Navbar' })

  const appStore = useAppStore()
  const userStore = useUserStore()
  // const { t, locale } = useI18n()

  const userLogout = async () => {
    await userStore.LogOut()
    logout(window.location.href)
  }

  const handleI18n = () => {
    const lang = appStore.lang === 'en' ? 'zh-CN' : 'en'
    loadLanguageAsync(lang)
    appStore.lang = lang
  }
</script>

<template>
  <div class="navbar" mode="horizontal">
    <div class="img-box">
      <svg-icon class="logo" icon-class="logo" color="#fff" />
    </div>

    <div class="nav-content">
      <div class="left-menu">
        <bread-crumb />
      </div>

      <div class="right-menu">
        <el-dropdown class="avatar-container right-menu-item" trigger="click">
          <div class="avatar-wrapper">
            <span>{{ userStore.name }}</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu class="top-bar-menu">
              <el-dropdown-item @click.enter="userLogout">
                <span style="display: block">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <div class="right-menu-item" v-if="appStore.hasI18n">
          <span class="lang" @click="handleI18n">{{ appStore.lang === 'en' ? 'En' : '中' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .top-bar-menu.el-popper[x-placement^='bottom'] {
    margin-top: 0px;
  }
  .top-bar-menu.el-dropdown-menu--medium {
    padding: 0;
    line-height: 25px;
  }
  .top-bar-menu.el-dropdown-menu--medium .el-dropdown-menu__item {
    line-height: 25px;
  }
  .top-bar-menu.el-dropdown-menu {
    padding: 5px 0;
    border-radius: 0px;
    -webkit-box-shadow: 3px 3px 12px 0 rgba(34, 34, 34, 0.47);
    box-shadow: 3px 3px 12px 0 rgba(34, 34, 34, 0.47);
  }
</style>

<style lang="scss" scoped>
  .navbar {
    position: fixed;
    width: 100vw;
    height: $navHeight;
    line-height: $navHeight;
    z-index: 200;
    border-bottom: none !important;
    background-color: #fff;
    box-shadow: 0px 1px 5px #bcbcbc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left-menu {
      float: left;

      .app-title {
        font-size: 14px;
        margin-left: 20px;
        color: #666;
      }
    }
    .right-menu {
      float: right;
      margin-right: 20px;
      height: 100%;
      overflow: hidden;
      &:focus {
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        font-size: 14px;
        color: #666;
        margin: 0 8px;
        cursor: pointer;
      }
      .avatar-container {
        height: $navHeight;
        line-height: $navHeight;
        margin-right: 10px;
        .avatar-wrapper {
          cursor: pointer;
          position: relative;
          .el-icon-arrow-down {
            font-size: 12px;
            margin-left: 8px;
          }
        }
      }

      .lang {
        display: inline-block;
        cursor: pointer;
        font-size: 14px;
        width: 30px;
        height: 30px;
        line-height: 25px;
        text-align: center;
        border: 2px solid #555;
        color: #555;
        border-radius: 50%;
        transform: scale(0.65);
        font-weight: bold;
      }
    }
    .img-box {
      position: relative;
      width: 180px;
      height: $navHeight;
      background-color: rgba(71, 127, 227, 1);
      :deep(svg) {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        height: 32px;
        width: 130px;
      }
    }
    .nav-content {
      height: $navHeight;
      flex-grow: 1;
    }
  }

  .top-bar-menu {
    padding: 0;
  }
</style>
