<template>
  <div class="groupbox">
    <div class="title"> 全部{{ title }} ({{total }}) </div>
    <div class="search-box">
      <a-input-search
        allowClear
        @search="onSearchGroupleader"
        @pressEnter="onSearchGroupleader"
        v-model="searchGroupleader"
        @blur="blursearch"
        @focus="searchClick"
        :placeholder="`请输入${title}名称`"></a-input-search>
    </div>
    <div class="list-wrap">
      <div
        v-infinite-scroll="allemployees"
        class="demo-infinite-container"
        :infinite-scroll-disabled="busy"
        :infinite-scroll-distance="10"
      >
        <a-list :data-source="staffdata" v-if="staffdata.length>0">
          <div class="list-item" slot="renderItem" slot-scope="item, index" :key="index" @click="choiceGroup(item)">
            <div class="item-content" >
              <img :src="item.thumbAvatar ||defaultThumbAvatar" class="avatar" alt="">
              <span class="name">{{ item.name ||item.groupName ||item.staffName }}</span>
            </div>
            <a-icon type="check-circle" v-if="defalytStaffIndex==(item.staffId ||item.groupId)" class="img"/>
            <div class="circle" v-else></div>
          </div>
        </a-list>
        <div v-else class="cter">没有更多相关{{ title }}哦~~</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getStaff,getQuitStaff,getCustGrpList } from '@/api/businessAdmin'
import {customersDetail} from '@/api/clientBaseOperation/labelGroup'
import infiniteScroll from 'vue-infinite-scroll';

export default {
  directives: { infiniteScroll },
  props:{
    type: {
      type: String,
      default: 'Staff'
    },
    title:{
      type: String,
      default: '员工'
    },
    tagPullId:{
      type:String,
      default:''
    }
  },
  data(){
    return{
        defaultThumbAvatar:require('@/assets/icons/default.svg'),
        staffdata:[],//员工列表
        defalytStaffIndex:'',
        loading: false,
        busy: false,
        total:0,
        page: 1, // 未使用第几页
        limit: 10, // 每页条数
        searchGroupleader:'',//群主名称
    }
  },
  created(){
    //this.allemployees()
  },
  methods:{
    searchClick(){
      this.$emit('isSearchNoHide','1')
    },
    blursearch(){
      this.$emit('isSearchNoHide','2')
    },
    allemployees(){
      switch(this.type){
        case 'Staff':// 获取客服人员列表
          const params = {
              currentPage:this.page,
              pageSize:this.limit,
              name:this.searchGroupleader||''
          }
          this.loading = true;
          if(this.total!='0'){
            if (this.staffdata.length >= this.total) {
                this.busy = true;
                  return;
            }
          }
          getStaff(params).then(res => {
              res.data.list.map(item=>{
                item.flag=false
              })
              const dataList = res.data.list;
              this.total=res.data.total
              if (this.staffdata.length >= this.total) {
                  this.busy = true;
                   return;
              }
              if (this.page > 1) {
                  this.staffdata = [...this.staffdata, ...dataList];
              } else {
                  this.staffdata = [...dataList];
              }

              this.page = this.page + 1;
              this.loading = false;
          })
           break;
        case 'customersDetail':// 获取标签建群客服人员
          const par = {
              tagPullId:this.tagPullId||''
          }
          customersDetail(par).then(res => {
              this.total=res.data.total
              this.staffdata=res.data.list ||[]
          })
           break;
        case 'customer'://获取离职员工
          const param = {
              name:this.searchGroupleader||''
          }
          getQuitStaff(param).then(res => {
              this.total=res.data.total
              this.staffdata=res.data.list ||[]
          })
        break;
        case 'custGrpList'://群聊列表
          const param2 = {
              grpName:this.searchGroupleader||'',
              filterType: 0,
              grpStatus: 0,
              orderCondition: 1,
              orderWay: 1,
              date: '',
              currentPage: 1,
              pageSize: 9999,
          }
          getCustGrpList(param2).then(res => {
              this.total=res.data.total
              this.staffdata=res.data.list ||[]
          })
        break;
      }
    },
    //群主名称搜索
    onSearchGroupleader(){
      this.$emit('isSearchNoHide','0')
      this.page =1
      this.staffdata=[]
      this.allemployees()
    },
     //选择
    choiceGroup(item){
      this.defalytStaffIndex=item.userid ||item.groupId ||item.staffId
      console.log(this.defalytStaffIndex)
      if(this.type=='Staff'){
        this.$emit('closeopenstaff',item);
        this.$emit('closeopencustomer',item);
      }else if(this.type=='customer'){
        this.$emit('closeopencustomer',item);
      }else if(this.type=='custGrpList'){
        this.$emit('closeopengroup',item);
      }else if(this.type=='customersDetail'){
        this.$emit('closeopencustomer',item);
      }

    },
  }

}
</script>
<style scoped lang="less">
.groupbox{
    background: #fff;
    box-shadow: 0 2px 8px 0 rgb(0 ,0 ,0 ,0.2);
    width: 300px;
    box-sizing: border-box;
    max-height: 321px;
    padding: 20px 0 0;
    border-radius: 4px;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    .demo-loading-container {
      position: absolute;
      bottom: 40px;
      width: 100%;
      text-align: center;
    }
    .cter{
      text-align: center;
    }
  .title,.search-box {
    padding: 0 20px;
    margin-bottom: 10px;
  }
   .list-wrap {
    position: relative;
    min-height: 70px;
    -webkit-box-flex: 1;
    flex: 1;
    overflow: auto;
    padding: 10px 0 14px;
  }
  .list-item {
      cursor: pointer;
      margin-bottom: 10px;
      height: 50px;
      padding: 10px 20px;
      display: -webkit-box;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: justify;
      justify-content: space-between;
      .item-content {
          -webkit-box-flex: 1;
          flex: 1;
          overflow: hidden;
          margin-right: 10px;
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          .avatar {
              width: 30px;
              height: 30px;
              margin-right: 10px;
          }
          .name {
              color: rgba(0,0,0,.65);
              font-size: 14px;
              -webkit-box-flex: 1;
              flex: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              word-break: break-all;
          }
      }
      &:hover {
        background: #effaff;
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
      .img{
         color: #1890ff;
      }
  }
}
</style>