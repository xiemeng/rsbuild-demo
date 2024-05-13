<template>
  <div class="blank">
    <!-- 左边导航栏 -->
    <div class="flex-box">
      <div class="blank-left" :class="{ 'close' : !isOpen }">
        <header
          class="header"
          @mouseenter="isMouseenter = true"
          @mouseleave="isMouseenter = false">
          <div class="logo">
            <img src="/imgs/logo.png" />
            <span>Acadsoc</span>
          </div>
          <div class="menu-list">
            <a-icon class="icon" type="appstore" theme="outlined" />
            <span class="text">总览<a-icon type="right" class="right-arrow" /></span>
          </div>
          <!-- 快捷导航栏 -->
          <div class="search-tab" :class="{'mouseenter' : isMouseenter,'close' : !isOpen}">
            <a-input placeholder="请输入关键字搜索" class="search-input" v-model="searchName">
              <a-icon slot="prefix" type="search" />
            </a-input>
            <ul class="search-menu">
              <li v-for="(item,index) in allMenus" :key="index">
                <h4>{{ item.meta.title }}</h4>
                <p v-for="(item,index) in item.children" :key="index" class="search-children-menu">
                  <span @click="changeRoute(item)" v-if="!item.hidden" class="link">{{ item.meta.title }}</span>
                </p>
              </li>
            </ul>
          </div>
        </header>
        <section>
          <ul class="menu">
            <li
              v-for="(item,index) in menus"
              :key="index"
              :class="{ checked: index === selectIndex }"
              class="menu-list"
              @click="openChilrenMenu(item,index)">
              <a-tooltip :title="isOpen? '' :item.meta.title" placement="right">
                <template v-if="typeof item.meta.icon === 'string'">
                  <a-icon class="icon" :type="item.meta.icon"></a-icon>
                </template>
                <template v-else>
                  <div class="icon">
                    <component class="icon-chilren" :is="item.meta.icon"></component>
                  </div>
                </template>
              </a-tooltip>
              <span class="text">{{ item.meta.title }}</span>
            </li>
          </ul>
        </section>
        <footer @click="isOpen = !isOpen" class="footer" :class="{ 'close' : !isOpen }">
          <a-icon class="fold" :type="isOpen ? 'menu-fold' : 'menu-unfold'" />
        </footer>
      </div>
      <!-- 子导航栏 -->
      <aside class="aside-menu" v-show="selectMenu.length > 0">
        <p class="title">{{ selectMeta.title }}</p>
        <a-menu mode="inline" v-model="selectKey">
          <template v-for="item in selectMenu">
            <a-menu-item :key="item.name" v-if="!item.hidden">
              <router-link :to="item.path"></router-link>
              {{ item.meta.title }}
            </a-menu-item>
          </template>
        </a-menu>
      </aside>

    </div>

    <!-- 头部姓名区域 -->
    <div class="head">
      <div class="right">
        <a-dropdown v-if="currentUser && currentUser.name" placement="bottomRight">
          <span class="ant-pro-account-avatar">
            <a-avatar size="small" :src="currentUser.avatar" class="antd-pro-global-header-index-avatar" />
            <span>{{ currentUser.name }}</span>
          </span>
          <template v-slot:overlay>
            <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
              <a-menu-item key="logout" @click="handleLogout">
                <a-icon type="logout" />
                退出登录
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <span v-else>
          <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
        </span>
      </div>
    </div>
    <!-- 路由部分 -->
    <div class="blank-right flex1">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Modal } from 'ant-design-vue'
export default {
  name: 'BlankLayout',
  data() {
    return {
      menus: [],
      isOpen: true,
      selectIndex: '', // 选中的下标
      selectKey: [], // 选中的导航
      selectMenu: [], //选中的子导航栏
      searchName: '',
      selectMeta: {},
      isMouseenter: false,
      currentUser: {
        avatar: '',
        name: '',
      }
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    }),
    allMenus() {
      const filterMenus = this.menus.map(item => {
        return {
          ...item,
          children: item.children.filter(item => {
            return item.meta.title.indexOf(this.searchName) != -1
          })
        }
      })
      return filterMenus
    },
    routerName() {
      return this.$route.name
    }
  },
  watch: {
    routerName() {
      this.defaultSelectMenu(this.$route.meta?.permission?.[0])
    }
  },
  created () {
    console.log(this.$route)
    const routes = this.mainMenu.find(item => item.path === '/')
    this.menus = (routes && routes.children) || []
    // 处理侧栏收起状态
    this.$watch('collapsed', () => {
      this.$store.commit(SIDEBAR_TYPE, this.collapsed)
    })
    this.$watch('isMobile', () => {
      this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile)
    })
    this.currentUser = {
      name: this.$store?.state?.user?.name || '未获取到用户名',
      avatar: this.$store?.state?.user?.avatar
    }
    this.defaultSelectMenu(this.$route.meta?.permission?.[0])
  },
  methods: {
    // 打开子栏
    openChilrenMenu(detail,index) {
      this.selectIndex = index
      this.selectMenu = detail.children
      this.selectMeta = detail.meta
      this.selectKey = [this.selectMenu[0].name]
      this.$router.push(this.selectMenu[0].path)
      this.isOpen = false
    },
    // 默认选中
    defaultSelectMenu(name) {
      this.menus.find((item,index) => {
        const selectMenus =  item.children?.find(children => {
          return children.name === name
        })
        if(selectMenus) {
          this.selectIndex = index
          this.selectMenu = item.children
          this.selectMeta = item.meta
          this.selectKey = [selectMenus.name]
          return item
        }
      })
    },
    // 改变路由
    changeRoute(data) {
      this.selectMenu = []
      this.$router.push(data.path)
      this.defaultSelectMenu(data.name)
    },
    handleLogout (e) {
      Modal.confirm({
        title: this.$t('layouts.usermenu.dialog.title'),
        content: this.$t('layouts.usermenu.dialog.content'),
        onOk: () => {
          return this.$store.dispatch('Logout').then(() => {
            this.$router.push({ name: 'login' })
          })
        },
        onCancel () {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .blank {
    display: flex;
    height: 100%;
    font-size: 12px;
    background: #f0f2f5;
    .blank-left {
      position: relative;
      z-index: 99;
      background: #001529;
      color: #fff;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      width: 160px;
      transition: all .2s ease-in;
      cursor: pointer;
      &.close {
        width: 50px;
      }
      .header {
        border-bottom: 1px solid rgb(102, 102, 125);
        padding-bottom: 10px;
        margin-bottom: 10px;
        padding-top: 10px;
        .logo {
            font-size: 22px;
            padding: 0 14px;
            white-space: nowrap;
            img {
              width: 30px;
              height: 30px;
              line-height: 30px;
              margin-right: 10px;
            }
        }
      }
      .footer {
        text-align: center;
        height: 34px;
        line-height: 34px;
        background: #002140;
        position: fixed;
        width: 160px;
        bottom: 0;
        transition: all .2s ease-in;
        &.close {
          width: 50px;
        }
        .fold {
          font-size: 16px;
        }
      }
    }
    .menu-list {
      padding: 10px 10px 10px 17px;
      overflow: hidden;
      white-space: nowrap;
      display: flex;
      align-items: center;
      &.checked {
        .icon {
          color: #1890ff;
        }
      }
      &:hover {
        background-color: #000;
        .icon,.right-arrow {
          color: #1890ff;
        }
      }
      .icon {
        margin-right: 20px;
        width: 16px;
        height: 16px;
        color: #fff;
        font-size: 16px;
      }
      .text {
        display: flex;
        flex: 1;
        justify-content: space-between;
        .right-arrow {
          font-size: 18px;
        }
      }
    }
    .aside-menu {
      width: 160px;
      background: rgb(255, 255, 255);
      padding-bottom: 10px;
      margin-top: 46px;
      overflow: hidden auto;
      .title {
        padding: 10px 24px;
        font-size: 14px;
        border-bottom: 1px solid #ccc;
      }
    }
  }
  .icon-chilren {
    width: 16px;
    height: 16px;
  }
  .blank-right {
    margin-left: 6px;
    margin-top: 46px;
    overflow-y: auto;
  }
  .head {
      background: #fff;
      width: 100%;
      position: fixed;
      top: 0;
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      margin-bottom: 6px;
      .right {
        text-align: right;
        .antd-pro-global-header-index-avatar {
          margin-right: 10px;
        }
      }
    }
  .search-tab {
    background: #001529;
    transition: width .25s,opacity .25s;
    overflow: hidden;
    cursor: default;
    position: fixed;
    left: 160px;
    z-index: 9999;
    height: 100vh;
    box-sizing: border-box;
    width: 0;
    top: 0;
    opacity: 1;
    &.mouseenter {
      width: 400px;
      opacity: .9;
    }
    &.close {
      left: 50px;
    }
    .search-input {
      margin: 0px 20px;
      margin-top: 10px;
      width: 200px;
      /deep/ input {
        background-color: #000;
        color: #fff;
        border: none;
      }
      /deep/ i {
        color: #fff;
      }
    }
    .search-menu {
      overflow: auto;
      padding: 0px 20px;
      padding-bottom: 10px;
      justify-content: center;
      align-items: center;
      column-count: 3;
      column-gap: 20;
      li {
        border-bottom: 1px solid rgb(51, 51, 51);
        break-inside: avoid;
        padding-bottom: 5px;
      }
        h4 {
          font-size: 14px;
          color: #fff;
          cursor: pointer;
          transition: color .3s;
          padding-top: 10px;
        }
        .search-children-menu {
          font-size: 12px;
          cursor: pointer;
          line-height: 25px;
          transition: color .25s;
          .link {
            color: #999;
            &:hover {
              color: #1890ff;
            }
          }

        }
    }
  }

</style>
