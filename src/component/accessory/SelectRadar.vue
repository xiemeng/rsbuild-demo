<template>
  <CommonModal v-bind="sourceModal" @cancle="$emit('cancle')" @serviceOk="serviceOk">
    <a-input-search placeholder="请输入雷达名称" v-model="radarName" @search="search" allowClear />
    <div class="tab-wrap">
      <span class="tab" :class="{ active: type === '' }" @click="selectTab('')">全部</span>
      <a-divider type="vertical" />
      <span class="tab" :class="{ active: type === 1 }" @click="selectTab(1)">雷达链接</span>
      <a-divider type="vertical" />
      <span class="tab" :class="{ active: type === 2 }" @click="selectTab(2)">雷达PDF</span>
      <a-divider type="vertical" />
      <span class="tab" :class="{ active: type === 3 }" @click="selectTab(3)">雷达文章</span>
    </div>
    <div
      v-infinite-scroll="handleInfiniteOnLoad"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="10"
      class="scroll-list"
    >
      <ul v-if="pageList.length > 0" class="randar-list-wrap">
        <li v-for="item in pageList" :key="item.radarId" class="randar-list" @click="selectRandarId = item.radarId">
          <header class="randar-head">
            <div>
              <a-tag color="blue">
                {{ typeText[item.type] }}
              </a-tag>
              {{ item.radarName }}
            </div>
            <a-checkbox :checked="selectRandarId === item.radarId"></a-checkbox>
          </header>
          <section class="randar-main">
            <div class="randar-main-content">
              <p>{{ item.title }}</p>
              <p class="aks-tips">{{ item.desc }}</p>
            </div>
            <img :src="getSrc(item)" class="cover-img" />
            <!-- <a-avatar :size="40" :src="getSrc(item)" shape="square"></a-avatar> -->
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
import { interactiveRadarList } from '@/api/customerConversion/dashboard'
import infiniteScroll from 'vue-infinite-scroll'
export default {
  name: 'SelectRadar',
  directives: { infiniteScroll },
  components: { CommonModal },
  props: {
    source: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      sourceModal: {
        title: '添加链接'
      },
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      type: '', // 1-link 2-pdf 3-article
      typeText: {
        1: '链接',
        2: 'PDF',
        3: '文章',
        4: '文章'
      },
      typeImg: {
        1: 'https://acadsocscrmpc.oss-cn-shenzhen.aliyuncs.com/h5/img/default-cover.png',
        2: 'https://acadsocscrmpc.oss-cn-shenzhen.aliyuncs.com/h5/img/pdf.png',
        3: 'https://acadsocscrmpc.oss-cn-shenzhen.aliyuncs.com/h5/img/default-cover.png',
        4: 'https://acadsocscrmpc.oss-cn-shenzhen.aliyuncs.com/h5/img/default-cover.png'
      },
      radarName: '',
      loading: false,
      busy: false,
      pageList: [],
      selectRandarId: '' // 选中的雷达的链接
    }
  },
  methods: {
    serviceOk() {
      if (this.selectRandarId) {
        const randar = this.pageList.find(item => item.radarId === this.selectRandarId)
        this.$emit('serviceOk', randar)
      } else {
        this.$message.warning('请选择一个雷达链接')
      }
    },
    init() {
      const params = {
        currentPage: this.pagination.current,
        pageSize: this.pagination.pageSize,
        radarName: this.radarName,
        source: this.source,
        type: this.type
      }
      this.loading = true
      interactiveRadarList(params)
        .then(res => {
          if (res.data.list.length > 0) {
            this.pageList.push(...res.data.list)
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
    },
    getSrc(item) {
      if (item.coverUrl) {
        return item.coverUrl
      } else {
        item.coverUrl = this.typeImg[item.type]
        return this.typeImg[item.type]
      }
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
    background: #f6fcff;
    padding: 10px 10px;
    border: 1px solid #fff;
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
.cover-img {
  width: 40px;
  height: 40px;
}
</style>
