<template>
  <div class="page-wrap">
    <div @click.stop="selectFocusIsOpen" class="button-name" @mouseenter="enter" @mouseleave="leave">
      <span
        style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: rgba(0, 0, 0, 0.25)"
        v-if="selectList.length <= 0"
      >
        {{ txt }}
      </span>
      <span v-else v-for="(item, index) in selectList" :key="index" v-show="index < 2">
        <a-avatar :size="28" shape="square" :src="item.thumbAvatar"></a-avatar>
        {{ item.name }}
      </span>
      <span v-show="selectList.length > 2">等{{ selectList.length }}个</span>
      <span style="color: rgba(0, 0, 0, 0.25)">
        <a-icon type="down" v-if="selectList.length <= 0" />
        <a-icon type="close-circle" @click.stop="iconClear" theme="filled" v-else />
      </span>
    </div>
    <div class="selectBox_list" v-show="isOpen" v-clickoutside="handleClose">
      <div class="group-owner">
        <header class="header">全部{{ nameTxt }} ({{ total }})</header>
        <div class="search-name">
          <a-input-search
            @search="onSearchName"
            v-model.trim="searchName"
            placeholder="请输入员工后回车"
          ></a-input-search>
        </div>
        <ul class="list-wrap">
          <div
            v-infinite-scroll="getDictionaryByCode"
            class="demo-infinite-container"
            :infinite-scroll-disabled="busy"
            :infinite-scroll-distance="10"
          >
            <li v-for="item in groupOwners" :key="item.staffId" class="title-wrap" @click.stop="selectGroupOwner(item)">
              <a-space :size="12">
                <a-avatar :size="30" :src="item.thumbAvatar" shape="square"></a-avatar>
                <span>{{ item.name }}</span>
              </a-space>
              <div>
                <a-icon type="check-circle" v-if="defalytStaffIndex.includes(item.userid)" class="check-circle" />
                <div class="circle" v-else></div>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll'
import { getStaff } from '@/api/businessAdmin'
import { getAdmins } from '@/api/customerConversion/management'

const clickoutside = {
  // 初始化指令
  bind(el, binding) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  update() {},
  unbind(el) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}
export default {
  name: 'SearchForm',
  /**在vue里注册构造的函数**/
  directives: { clickoutside, infiniteScroll },
  props: {
    reactflag: {
      //是否清空
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'getStaff' //getStaff查所有员工 getAdmins查询管理员
    },
    defaultSelectList: {
      type: Array,
      default: () => []
    },
    isMultiple: {
      type: Boolean, //是否多选
      default: false
    }
  },
  data() {
    return {
      selectList: [],
      thumbAvatar: '',
      defalytStaffIndex: [],
      busy: true, // 表示由变量busy决定是否执行loadMore，false则执行loadMore，true则不执行，注意，busy表示繁忙，繁忙的时候是不执行的。
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      total: 0,
      totalNum: 0, // 账号总数
      selectRoleId: '3', // 角色id
      employeeName: '', // 员工名字
      groupOwners: [],
      page: 1, // 未使用第几页
      limit: 10, // 每页条数
      value: [],
      searchName: '', // 搜索名字
      styleButton: 1,
      owners: [], // 群主列表
      isOpen: false, // 是否打开群主列表
      loading: false, // 加载
      buttonLoding: false, // 按钮加载
      ownersID: { data: [] } // 增删id
    }
  },
  mounted() {
    this.selectList = JSON.parse(JSON.stringify(this.defaultSelectList))
    console.log(this.selectList)
    if (this.selectList.length > 0) {
      this.defalytStaffIndex = this.selectList.map(item => {
        return item.userid
      })
    }
  },
  computed: {
    txt() {
      let txt
      if (this.type == 'getStaff') {
        txt = '请选择员工'
      } else if (this.type == 'getAdmins') {
        txt = '选择接收管理员'
      }
      return txt
    },
    nameTxt() {
      let txt
      if (this.type == 'getStaff') {
        txt = '员工'
      } else if (this.type == 'getAdmins') {
        txt = '管理员'
      }
      return txt
    }
  },
  created() {
    //this.getDictionaryByCode()
    // this.ownersID = JSON.parse(JSON.stringify(this.responseData))
  },
  methods: {
    enter() {
      this.styleButton = 2
    },
    leave() {
      this.styleButton = 1
    },
    selectGroupOwner(value) {
      if (this.isMultiple) {
        this.selectList = []
        this.defalytStaffIndex = []
        this.selectList.push(value)
        this.defalytStaffIndex = [value.userid]
        this.isOpen = false
        this.$emit('selectCustom', this.selectList)
      } else {
        const index = this.selectList.findIndex(item => {
          if (item.userid === value.userid) {
            return item
          }
        })
        if (index >= 0) {
          this.selectList.splice(index, 1)
        } else {
          this.selectList.push(value)
        }
        this.defalytStaffIndex = this.selectList.map(item => {
          return item.userid
        })
        this.$emit('selectCustom', this.selectList)
      }
    },
    iconClear() {
      this.selectList = []
      this.defalytStaffIndex = []
      this.isOpen = true
      this.$emit('selectCustom', this.selectList)
    },
    handleClose() {
      // 点击除了页面其他地方关闭车型选择
      this.isOpen = false
    },
    selectFocusIsOpen() {
      // 获得焦点调用
      this.isOpen = !this.isOpen
    },
    handleInfiniteOnLoad() {
      // 点击加载
      this.pagination.current++ // 自增
      this.loading && this.getDictionaryByCode()
    },
    // 得到数据字典数据
    getDictionaryByCode() {
      const params = {
        currentPage: this.page,
        pageSize: this.limit,
        name: this.searchName || ''
      }
      if (this.buttonLoding) {
        return
      }
      this.buttonLoding = true
      this.loading = true
      if (this.total != '0') {
        if (this.groupOwners.length >= this.total) {
          this.busy = true
          return
        }
      }
      if (this.type == 'getStaff') {
        this.getStaff(params)
      } else if (this.type == 'getAdmins') {
        this.getAdmins(params)
      }
    },
    getStaff(params) {
      getStaff(params)
        .then(res => {
          const dataList = res.data.list
          this.total = res.data.total
          if (this.page > 1) {
            this.groupOwners = [...this.groupOwners, ...dataList]
          } else {
            this.groupOwners = [...dataList]
          }
          if (this.groupOwners.length >= this.total) {
            this.busy = true
            return
          }
          this.page = this.page + 1
          this.loading = false
        })
        .catch(error => {
          this.$message.error(error || error.message)
        })
        .finally(() => {
          this.buttonLoding = false
        })
    },
    getAdmins(params) {
      getAdmins(params)
        .then(res => {
          const dataList = res.data.list
          this.total = res.data.total
          if (this.page > 1) {
            this.groupOwners = [...this.groupOwners, ...dataList]
          } else {
            this.groupOwners = [...dataList]
          }
          if (this.groupOwners.length >= this.total) {
            this.busy = true
            return
          }
          this.page = this.page + 1
          this.loading = false
        })
        .catch(error => {
          this.$message.error(error || error.message)
        })
        .finally(() => {
          this.buttonLoding = false
        })
    },
    onSearchName() {
      // 搜索用户
      this.groupOwners = []
      this.page = 1
      this.getDictionaryByCode()
    }
  },
  watch: {
    defaultSelectList: {
      handler(newval, oldval) {
        this.selectList = JSON.parse(JSON.stringify(this.defaultSelectList))
        console.log(this.selectList)
        if (this.selectList.length > 0) {
          this.defalytStaffIndex = this.selectList.map(item => {
            return item.userid
          })
        } else {
          this.defalytStaffIndex = []
        }
        console.log(this.defalytStaffIndex)
      }
    },
    reactflag: {
      handler(newval, oldval) {
        this.selectList = []
        this.defalytStaffIndex = []
        this.isOpen = false
        this.$emit('selectCustom', this.selectList)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.page-wrap {
  position: relative;
}
.check-circle {
  color: #1890ff;
}
.circle {
  width: 14px;
  height: 14px;
  display: inline-block;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #cecece;
  position: relative;
  vertical-align: middle;
}
.box-space-between() {
  // 左右布局
  display: flex;
  justify-content: space-between;
}
.anchor {
  text-align: center;
  padding: 10px;
}
.transfer {
  width: 300px;
  background-color: #fff;
}
.use-person {
  width: 190px;
  height: 32px;
  border: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  padding: 0 8px;
  overflow: hidden;
  ul {
    display: flex;
    flex: 1;
    li {
      width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .omit {
    white-space: nowrap;
    margin-left: 8px;
  }
}
.group-owner {
  background-color: #fff;
  .header {
    padding: 10px 20px;
    padding-bottom: 0;
    font-size: 14px;
  }
  .search-name {
    padding: 10px 20px;
  }
  .list-wrap {
    height: 220px;
    overflow-y: auto;
    overflow-x: hidden;
    li {
      padding: 10px 20px;
      cursor: pointer;
      &:hover {
        background-color: lightblue;
      }
    }
  }
}
.selectBox_list {
  // 悬浮下拉框
  position: absolute;
  background-color: #f9f9f9;
  width: 300px;
  top: 45px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2); //做边框阴影
  z-index: 999999;
}
.button-name {
  .box-space-between();
  align-items: center;
  min-width: 200px;
  height: 36px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  padding: 0 12px;
  font-size: 14px;
  cursor: pointer;
}
.title-wrap {
  .box-space-between();
}
.box-space {
  .box-space-between();
  padding: 10px 20px;
}
</style>
