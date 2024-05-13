<template>
  <div
    contenteditable="true"
    maxLength="maxLength"
    class="textarea"
    v-html="innerText"
    :class="classNmae"
    data-form-type="reason"
    data-placeholder="请输入回复框的内容"
    @blur="textareaBlur"
    @input="changeText"
  ></div>
</template>
<script>
export default {
  name: 'Contenteditable',
  props: {
    classNmae: {
      type: String,
      default: 'link-textarea',
    },
    value: {
      type: String,
      default: '',
    },
    maxLength: {
      type: [String,Number],
      default: '',
    }
  },
  computed: {
      state() {
        return this.$route.query.state
      }
  },
  data() {
    return {
      innerText: '',
      isLocked: true,
      sel: null,
      range: null,
      textareaElement: '',
      num: 0,
    }
  },
  watch: {
    value:{
      handler() {
        if(this.state === 'add') return
        if(this.isLocked && this.value) {
          this.innerText = this.value
          this.isLocked = false
        }
      },
      immediate: true
    },
    classNmae: {
      handler() {
          this.textareaElement = document.querySelector(this.classNmae)
          if(this.textareaElement) {
            this.textareaElement.focus()
            this.textareaElement.blur()
          }
      },
      immediate: true
    }
  },
  methods: {
    // 把光标移到最后
    keepLastIndex(obj) {
        if(!obj) return
        this.$nextTick(() => {
          if (window.getSelection) { //ie11 10 9 ff safari
              obj.focus(); //解决ff不获取焦点无法定位问题
              var range = window.getSelection(); //创建range
              range.selectAllChildren(obj); //range 选择obj下所有子内容
              range.collapseToEnd(); //光标移至最后
          } else if (document.selection) { //ie10 9 8 7 6 5
              var range = document.selection.createRange(); //创建选择对象
              //var range = document.body.createTextRange();
              range.moveToElementText(obj); //range定位到obj
              range.collapse(false); //光标移至最后
              range.select();
          }
        })
    },
    textareaBlur() {
      this.sel = window.getSelection()
      this.range = this.sel.getRangeAt(0)
      this.range.deleteContents()
    },
    changeText(e) {
      this.controlMaxlength(e.target.innerHTML,e)
      this.$nextTick(() => {
        this.$emit('input', this.checkInnerHtml(this.$el.innerHTML))
      })
    },
    controlMaxlength(value,e) {
      if(value?.length > this.maxLength) {
        this.innerText = value.substring(0,this.maxLength - this.num)
        this.num++
        if(this.num > 6) {
          this.num = 0
        }
      }
      this.keepLastIndex(this.textareaElement)
    },
    // 当影响到客户昵称输入事，去掉光标颜色
    checkInnerHtml (innerHTML) {
      const reg = /<span[^>]*>([\s\S]*?)<\/span>/i
      const contantList = innerHTML.match(reg)
      var html = innerHTML
      if(contantList && contantList[1] !== '客户昵称') {
        html = innerHTML.replace(/<span class="nick-name">/g,'').replace(/<\/span>/g,'')
        this.innerText = html
        this.keepLastIndex(this.textareaElement)
      }
      return html
    },
    // 插入节点
    insertHtmlAtCaret(el) {
      if (window.getSelection) {
        // IE9 and non-IE
        if (this.sel.getRangeAt && this.sel.rangeCount) {
          var frag = document.createDocumentFragment(),
          lastNode = frag.appendChild(el)
          var div = document.createElement('div')
          div.innerHTML = '&#8203' // 加个空占位符来隔绝光标
          lastNode = frag.appendChild(div.firstChild)
          this.range.insertNode(frag)
          if (lastNode) {
            // 把光标移到最后面
            this.range = this.range.cloneRange()
            this.range.setStartAfter(lastNode)
            this.range.collapse(true)
            this.sel.removeAllRanges()
            this.sel.addRange(this.range)
            this.$emit('input', this.$el.innerHTML)
          }
        }
      } else if (document.selection && document.selection.type != 'Control') {
        // IE < 9
        document.selection.createRange().pasteHTML(html)
        this.$emit('input', this.$el.innerHTML)
      }
    },
  },
}
</script>

<style lang="less" scoped>
  .textarea {
    margin: 10px 0px 12px 15px;
    font-size: 15px;
    color: #3b3b3b;
    outline: 0;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-user-modify: read-write-plaintext-only;
    -webkit-user-select: text; //兼容ios上点击可弹出键盘无法输入的问题
    height: 110px;
    white-space: pre-wrap;
    word-break: break-all;
  }
  .textarea:empty:after {
    content: '请输入回复框的内容';
    color: #ababab;
    font-size: 11px;
    text-align: left;
  }
</style>
