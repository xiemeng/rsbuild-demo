<template>
  <div id='editor'></div>
</template>

<script>
// import Quill from './quill@2.0.0-beta.0';
// import 'quill/dist/quill.core.css';
// import Toolbar from 'quill/modules/toolbar';
// import Snow from 'quill/themes/snow';

// import Bold from 'quill/formats/bold';
// import Italic from 'quill/formats/italic';
// import Header from 'quill/formats/header';
export default {
  name: 'Quill',
  components: {
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-editor-quill'
    },
    // 表单校验用字段
    // eslint-disable-next-line
    value: {
      type: String
    }
  },
  data() {
    return {
      content: undefined,
      quill: {}
    }
  },
  mounted() {
    // this.quill = new Quill('#editor', {
    //   theme: 'snow',
    //   placeholder: '请输入',
    //   modules: {
    //     toolbar: {
    //       container: []
    //     },
    //     keyboard: {
    //       bindings: {
    //         custom: {
    //           key: 'Enter',
    //           shiftKey: false,
    //           handler: (range, context) => {
    //             this.submit()

    //           }
    //         },
    //       }
    //     }
    //   },
    // });
  },
  methods: {
    submit() {
      this.$emit('sendMessage', this.quill.getContents())
    },
    setContents(value = []) {
      this.quill.setContents(value)
    }
  },
  watch: {
    value(val) {
      this.content = val
    }
  }
}
</script>

<style lang="less" scoped>
#editor {
  height: 200px;
}
</style>
