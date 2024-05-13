<template>
  <div>
    <!-- 头部 -->
    <header class="head">
      <div class="head-left">
        <img src="/imgs/logo.png" />
        <span>Acadsoc</span>
        <span class="corp-name">{{ currentUser.corpName }}</span>
      </div>
      <div class="head-right">
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
    </header>
    <section class="section">
      <!-- 侧边导航栏 -->
      <aside class="section-aside">
        <a-input placeholder="请输入关键字搜索" class="search-input" v-model="searchName">
          <a-icon slot="prefix" type="search" />
        </a-input>
        <ul class="list-wrap" v-show="allMenus.length > 0">
          <!-- 首页 -->
          <li class="menu-list home" @click="goHome" :class="{ checked: selectName == 'Home' }">
            <div class="icon-title">
              <div class="icon-wrap">
                <a-icon class="icon" type="home"></a-icon>
              </div>
              <span class="text">首页</span>
            </div>
          </li>
          <!-- <li class="menu-list home" @click="goChat" :class="{ checked: selectName == 'Chat' }">
            <div class="icon-title">
              <div class="icon-wrap">
                <img src="/imgs/chatgpt.svg" alt="" class="icon-14">
              </div>
              <span class="text">ChatGPT</span>
            </div>
          </li> -->
          <li v-for="(item, index) in allMenus" :key="index" class="menu-list" v-show="item.name !== 'Home'">
            <div class="icon-title">
              <div class="icon-wrap" v-if="item.meta.icon === 'chat'">
                 <img src="/imgs/chatgpt.svg" alt="" class="icon-14">
              </div>
              <div class="icon-wrap" v-if="item.meta.icon === 'douyin'">
                <img src="/imgs/douyin/抖音.svg" alt="" class="icon-14">
              </div>
              <div class="icon-wrap" v-if="item.meta.icon === 'tx'">
                <img src="/imgs/视频号.svg" alt="" class="icon-14">
              </div>
              <div class="icon-wrap" v-if="item.meta.icon === 'xhs'">
                <img src="/imgs/小红书.png" alt="" class="icon-14">
              </div>
              <div class="icon-wrap" v-if="item.meta.icon === 'ks'">
                <img src="/imgs/快手.png" alt="" class="icon-14">
              </div>
              <div class="icon-wrap" v-if="item.meta.icon === 'acadsoc'">
                <img src="/imgs/lifei-logo.png" alt="" class="icon-14">
              </div>
              <div class="icon-wrap" v-if="item.meta.icon === 'bili'">
                <img src="/imgs/bilibili.png" alt="" class="icon-14">
              </div>
              <div class="icon-wrap" v-else>
                <a-icon class="icon" :type="item.meta.icon" v-if="typeof item.meta.icon === 'string'"></a-icon>
                <component class="icon-chilren" :is="item.meta.icon" v-else></component>
              </div>
              <span class="text">{{ item.meta.title }}</span>
            </div>

            <ul class="children-router">
              <li
                v-for="(item, index) in item.children"
                :key="index"
                :class="{ checked: selectName === item.name }"
                class="search-children-menu"
                @click="changeRoute(item, index)"
                v-show="!item.hidden"
              >
                <span class="link">{{ item.meta.title }}</span>
              </li>
            </ul>
          </li>
        </ul>
        <div v-show="allMenus.length <= 0" class="empty">
          <a-empty />
        </div>
      </aside>
      <!-- 路由部分 -->
      <div class="blank-right flex1" ref="mianscroll">
        <router-view />
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Modal } from 'ant-design-vue'
export default {
  name: 'FixedLayout',
  components: {},
  data() {
    return {
      menus: [],
      searchName: '',
      selectName: 'Home',
      currentUser: {
        avatar: '',
        name: '',
        corpName: ''
      }
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    }),
    allMenus() {
      const filterMenus = this.menus
        .map(item => {
          return {
            ...item,
            children: item.children.filter(item => {
              return item.meta.title.indexOf(this.searchName) != -1
            })
          }
        })
        .filter(item => item.children.length > 0)
      return filterMenus
    },
    routerName() {
      return this.$route.name
    }
  },
  created() {
    const routes = this.mainMenu.find(item => item.path === '/')
    this.menus = (routes && routes.children) || []
    this.currentUser = {
      name: this.$store?.state?.user?.name || '未获取到用户名',
      avatar: this.$store?.state?.user?.avatar,
      corpName: this.$store?.state?.user?.corp?.name || '未获到公司名'
    }
    this.defaultSelectMenu(this.$route.meta?.permission?.[0])
     const name =window.location.pathname;
      if(name=='/chat'){
        this.selectName='Chat'
      }
  },
  mounted(){
    const that=this
     this.$EventBus.$on('closecollapseChange', (val) => {
        const scrollEl = that.$refs.mianscroll;
        scrollEl.scrollTo({ top: val, behavior: 'smooth' });
    })
  },
  watch: {
    routerName() {
      this.defaultSelectMenu(this.$route.meta?.permission?.[0])
    }
  },
  methods: {
    goHome() {
      console.log('执行了这里')
      this.selectName = 'Home'
      this.$router.push('/home')
    },
    goChat() {
      this.selectName = 'Chat'
      this.$router.push('/chat')
    },
    // 默认选中
    defaultSelectMenu(name) {
      this.menus.find((item, index) => {
        const selectMenus = item.children?.find(children => {
          return children.name === name
        })
        if (selectMenus) {
          this.selectName = selectMenus.name
          this.selectMenu = item.children
          this.selectMeta = item.meta
          this.selectKey = [selectMenus.name]
          return item
        }
      })
    },
    // 改变路由
    changeRoute(data, index) {
      this.selectName = data.name
      this.selectMenu = []
      this.$router.push(data.path)
      this.defaultSelectMenu(data.name)
    },
    // 退出登录
    handleLogout(e) {
      Modal.confirm({
        title: this.$t('layouts.usermenu.dialog.title'),
        content: this.$t('layouts.usermenu.dialog.content'),
        onOk: () => {
          return this.$store.dispatch('Logout').then(() => {
            this.$router.push({ name: 'login' })
          })
        },
        onCancel() { }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.icon-14 {
  width: 14px;
  height: 14px;
}
.head {
  display: flex;
  justify-content: space-between;
  background: #001529;
  padding: 0 20px;
  height: 60px;
  align-items: center;
  color: #fff;
  .head-left {
    font-size: 22px;
    padding: 0 14px;
    white-space: nowrap;
    img {
      width: 30px;
      height: 30px;
      line-height: 30px;
      margin-right: 10px;
    }
    .corp-name {
      margin-left: 20px;
      font-size: 15px;
    }
  }
}
.antd-pro-global-header-index-avatar {
  margin-right: 15px;
}
.section {
  display: flex;
  height: calc(~'100vh - 60px');
  background: #f0f2f5;
  overflow: hidden;
  .section-aside {
    background: #001529;
    padding: 0 10px;
    width: 247px;
    position: relative;
    color: rgba(299, 299, 299, 0.9);
    .search-input {
      /deep/input {
        background: #001529;
        border: none;
        border-bottom: 1px solid rgba(299, 299, 299, 0.3);
        color: rgba(299, 299, 299, 0.9);
      }
      /deep/i {
        color: rgba(299, 299, 299, 0.9);
      }
    }
    .list-wrap {
      height: calc(~'100vh - 92px');
      overflow-y: auto;
      padding-bottom: 20px;
      li {
        line-height: 40px;
      }
      .menu-list {
        border-bottom: 1px dashed rgba(299, 299, 299, 0.3);
        padding-left: 20px;
        &.home {
          cursor: pointer;
          &:hover {
            background-color: #1890ff;
            color: #fff;
          }
          &.checked {
            background-color: #1890ff;
            color: #fff;
          }
        }
        .icon-title {
          position: relative;
          .icon-wrap {
            position: absolute;
            left: -15px;
            top: 50%;
            transform: translateY(-50%);
            .icon-chilren {
              width: 16px;
              height: 16px;
              position: relative;
              top: 3px;
            }
          }
        }
        .text {
          padding-left: 10px;
        }
        .children-router {
          color: rgba(299, 299, 299, 0.6);
          display: flex;
          flex-wrap: wrap;
          cursor: pointer;
          .search-children-menu {
            width: 50%;
            &:hover {
              color: #1890ff;
            }
            &.checked {
              color: #1890ff;
            }
          }
        }
      }
    }
    .empty {
      padding-top: 160px;
    }
  }
}
.blank-right {
  overflow-y: auto;
}
/* 整个滚动条 */
::-webkit-scrollbar {
  width: 0px;
}
</style>
