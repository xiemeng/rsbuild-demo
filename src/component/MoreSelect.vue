<template>
  <div @blur="isOpen = false"  tabindex="0" outline="0" class="select-input">
    <div class="select-contant" @click="isOpen = !isOpen">
      <ul>
        <a-tag v-for="(item,index) in selectList" :key="index" closable @close="close(index)">
          {{ item }}号
        </a-tag>
        <p class="font-color-black-25" v-if="selectList.length < 1">{{ placeHolder }}</p>
      </ul>
      <div class="icon">
          <a-icon type="down" v-if="selectList.length < 1" />
          <a-icon class="close-circle" type="close-circle" v-if="allowClear && selectList.length > 0" @click.stop="clean"></a-icon>
      </div>
    </div>
    <div class="povice" v-if="isOpen">
      <ul class="select-date">
        <li
          v-for="item in 31"
          :key="item"
          :class="{'active':selectList.includes(item)}"
          @click="getDate(item)">
          {{ item }}
        </li>
      </ul>
      <footer class="footer">
        <a-button type="primary" @click="isOpen = false">确定</a-button>
      </footer>
    </div>

  </div>
</template>

<script>
export default {
  name: 'MoreSelect',
  props: {
    allowClear: {
      type: Boolean,
      default: false
    },
    placeHolder: {
      type: String,
      default: ''
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectList: [],
      isOpen: false
    }
  },
  created() {
    this.selectList = this.value
  },
  methods: {
    getDate(item) {
      const index = this.selectList.findIndex(list => {
        return list === item
      })
      if(index < 0) {
        this.selectList.push(item)
      }else {
        this.selectList.splice(index,1)
      }
      this.$emit('input',this.selectList)
    },
    close(index) {
      this.selectList.splice(index,1)
      this.$emit('input',this.selectList)
    },
    clean() {
      this.selectList=[]
      this.$emit('input',this.selectList)
    }
  }
}
</script>

<style lang="less" scoped>
.select-contant {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #ccc;
    border-radius: 2px;
    cursor: pointer;
    padding: 0 6px;
    height: 32px;
    position: relative;
    ul {
      overflow: auto;
      width: 100%;
      white-space: nowrap;
      display: flex;
      align-items: center;
    }
    &:hover {
      border-color: #1890ff;
    }
    .icon {
      position: inherit;
      width: 15px;
      .close-circle {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
.povice {
  position: absolute;
  z-index: 99;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 4px;
  width: 300px;
  .footer {
    text-align: right;
  }
  .select-date {
    flex-wrap: wrap;
    li {
      width: 30px;height: 30px;
      line-height: 30px;
      margin: 5px;
      text-align: center;
      display: inline-block;
      &:hover {
        background-color: #b7c7d6;
      }
      &.active {
        background-color: #1890ff;
        color: #fff;
      }
    }
  }
}
.select-input {
  outline: none;
}
</style>
