/** * 业务组件，选择客户标签，带有添加功能 使用案例 clientBaseOperation/autoPullGroup/NewGruoup?state=add */
<template>
  <div>
    <h4 class="title">选择标签</h4>
    <slot name="title"></slot>
    <a-input-search
      allowClear
      placeholder="请输入要搜索的标签"
      v-model="searchNmae"
      @search="searchTag"
    ></a-input-search>
    <a-spin :spinning="spinning">
      <ul class="add-tags-wrap">
        <li v-for="(item, index) in tagList" :key="index">
          <p class="tags-title">{{ item.groupName }}:</p>
          <TagComponents :tagslist="item" @addTag="addTag" :selectTagList="item.selectTagList" isEdit></TagComponents>
        </li>
      </ul>
    </a-spin>
    <div class="foot-button">
      <a-button type="link" class="add-tags" @click="visible = true">
        <a-icon type="plus" />
        新建标签组
      </a-button>
      <a-space :size="12">
        <a-button @click="$emit('cancle')">取消</a-button>
        <a-button type="primary" @click="$emit('serviceOk', tagList)">确定</a-button>
      </a-space>
    </div>
    <a-modal v-model="visible" :footer="null" width="599px" centered destroyOnClose>
      <NewLabelgroup @cancle="visible = false" @serviceOk="serviceOk"></NewLabelgroup>
    </a-modal>
  </div>
</template>

<script>
import { getTagGroup, addOrEditTagGroup } from '@/api/customerService/tags'
import TagComponents from './TagComponents'
import NewLabelgroup from './NewLabelgroup'
import FormlabelAdd from './FormlabelAdd'
export default {
  name: 'SelectTags',
  components: { TagComponents, FormlabelAdd, NewLabelgroup },
  props: {
    // 回显，必须要有 tagId
    selectTagList: {
      type: [Array],
      default() {
        return []
      }
    }
  },
  data() {
    return {
      searchNmae: '',
      visible: false,
      tagList: [],
      spinning: false
    }
  },
  watch: {
    selectTagList() {
      this.tagList = this.getTagList(this.tagList)
    }
  },
  created() {
    this.getTagGroup()
  },
  methods: {
    serviceOk() {
      this.visible = false
      this.getTagGroup()
    },
    addTag({ value, tagItem, callBack }) {
      const params = this.getAddParams(value, tagItem)
      addOrEditTagGroup(params).then(() => {
        this.$message.success(`添加标签成功`)
        this.getTagGroup()
        callBack()
      })
    },
    getAddParams(tagName, tagItem) {
      const params = {
        wxGroupId: tagItem.wxGroupId,
        tagGroupName: tagItem.groupName,
        scope: tagItem.depScope ? 1 : 0,
        addOrEditTags: [
          {
            tagName: tagName
          }
        ],
        departments: []
      }
      return params
    },
    searchTag() {
      this.getTagGroup()
    },
    getTagGroup() {
      const params = {
        grpName: this.searchNmae || null
      }
      this.spinning = true
      getTagGroup(params)
        .then(res => {
          this.tagList = this.getTagList(res.data.tagGroup)
        })
        .catch(error => {
          this.$message.error(error || error.message)
        })
        .finally(() => {
          this.spinning = false
        })
    },
    getTagList(list) {
      return list.map(item => {
        const selectTagList = []
        this.selectTagList.forEach(tag => {
          item.tags?.filter(selectTag => {
            if (tag.tagId == selectTag.tagId) {
              selectTagList.push(selectTag)
            }
          })
        })
        return {
          ...item,
          selectTagList: selectTagList
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 17px;
  width: 100%;
  text-align: center;
  margin-top: 2px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 1px;
}
.add-tags-wrap {
  height: 400px;
  overflow: auto;
  .tags-title {
    margin-bottom: 10px;
  }
}
.foot-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  .add-tags {
    margin: 0;
    padding: 0;
  }
}
</style>
