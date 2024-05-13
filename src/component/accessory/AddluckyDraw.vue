<template>
  <CommonModal v-bind="sourceModal" @cancle="$emit('cancle')" @serviceOk="serviceOk">
    <div
      v-infinite-scroll="handleInfiniteOnLoad"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="10"
      class="scroll-list"
    >
      <ul v-if="pageList.length > 0" class="randar-list-wrap">
        <li v-for="item in pageList" :key="item.id" class="randar-list" @click="selectRandarId = item.id">
          <header class="randar-head">
            <div></div>
            <a-checkbox :checked="selectRandarId === item.id"></a-checkbox>
          </header>
          <section class="randar-main">
            <div class="randar-main-content">
              <p>{{ item.activityName }}</p>
              <p class="aks-tips">{{ item.activityExplain }}</p>
            </div>
            <a-avatar :size="40" :src="item.cover" shape="square"></a-avatar>
          </section>
        </li>
      </ul>
      <a-empty v-else />
      <div v-if="loading" class="loading-container">
        <a-spin tip="正在加载中..."></a-spin>
      </div>
      <div v-if="!loading && pageList.length > 0" class="loading-container">没有更多数据了</div>
    </div>
  </CommonModal>
</template>

<script>
import CommonModal from '@/component/CommonModal'
import infiniteScroll from 'vue-infinite-scroll'
import { getList } from '@/api/marketingCenter/luckyDraw'
export default {
  name: 'AddluckyDraw',
  directives: { infiniteScroll },
  components: { CommonModal },
  props: {
    editData: {
      type: Object,
      default() {
        return {}
      }
    },
    // 来源
    source: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      sourceModal: {
        title: '抽奖活动'
      },
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      form: {
        typeText: '抽奖活动',
        type: 'link',
        linkTitle: '',
        desc: '',
        key: 'visibileLuckDraw',
        coverUrl: {
          compress: ''
        }
      },
      type: '', // 1-link 2-pdf 3-article
      typeImg: {
        1: '/imgs/default-cover.png',
        2: '/icons/pdf.png',
        3: '/imgs/default-cover.png',
        4: '/imgs/default-cover.png'
      },
      radarName: '',
      loading: false,
      busy: false,
      pageList: [],
      selectRandarId: '' // 选中的雷达的链接
    }
  },
  watch: {
    editData: {
      handler() {
        // if (this.editData?.link?.radarId) {
        //   this.selectRandarId = this.editData.link?.radarId
        // } else if (this.editData?.id) {
        //   this.selectRandarId = this.editData.id
        // }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    serviceOk() {
      if (this.selectRandarId) {
        const randar = this.pageList.find(item => item.id === this.selectRandarId)
        randar.typeText = '抽奖活动'
        randar.linkTitle = randar.activityName
        randar.desc = randar.activityExplain
        randar.type = 'link'
        randar.key = 'visibileLuckDraw'
        randar.linktype = 'luck_link'
        randar.coverUrl = {
          compress: randar.cover
        }
        this.$emit('serviceOk', randar)
      } else {
        this.$message.warning('请选择一个自定义表单')
      }
    },
    init() {
      const params = {
        currentPage: this.pagination.current,
        pageSize: this.pagination.pageSize,
        source: this.source,
        name: '',
        status: 1
      }
      this.loading = true
      getList(params)
        .then(res => {
          if (res.data.list.length > 0) {
            this.pageList.push(...res.data.list)
            this.pageList.forEach(item => {
              item.cover = 'https://acadsocscrmpc.oss-cn-shenzhen.aliyuncs.com/h5/img/luckyBg.png'
            })
          }
          this.pagination.current++
          if (res.data.list.length < this.pagination.pageSize) {
            this.busy = true
            this.loading = false
            return
          }
          this.pagination.total = res.data.total
        })
        .catch(error => {
          this.$message.error(error || error.message)
        })
    },
    selectTab(type) {
      this.type = type
      this.pagination.current = 1
      this.pageList = []
      this.busy = false
      this.init()
    },
    search() {
      this.pagination.current = 1
      this.pageList = []
      this.busy = false
      this.init()
    },
    handleInfiniteOnLoad() {
      !this.busy && this.init()
    }
  }
}
</script>

<style lang="less" scoped>
.tab-wrap {
  margin-top: 15px;
  .tab {
    cursor: pointer;
    font-size: 13px;
    color: #8a8989;
    &.active {
      font-size: 16px;
      color: #000;
    }
  }
}
.loading-container {
  text-align: center;
}
.scroll-list {
  height: 470px;
  overflow-y: auto;
  overflow-x: hidden;
}
.randar-list-wrap {
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-top: 20px;
  margin-bottom: 10px;
  .randar-list {
    height: 120px;
    margin-right: 10px;
    padding: 10px 10px;
    border: 1px solid #ccc;
    width: 31%;
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
      border: 1px solid #1890ff;
    }
    .randar-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .randar-main {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      padding: 10px;
      .randar-main-content {
        p {
          white-space: nowrap;
          overflow: hidden;
          width: 160px;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
