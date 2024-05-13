<template>
  <div>
    <a-date-picker
      @change="createTimeOnChange"
      show-time
      :disabled-date="disabledDate"
      :disabled-time="disabledDateTime"
      format="YYYY-MM-DD HH:mm:ss"
      :placeholder="dateTimePlaceholder"
      v-model="datetime"
      :style="dateStyle"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      datetime: null,
    }
  },
  created(){
    this.init()
  },
  watch:{
    dateTimeStr(){
      this.init()
    },
  },
  props: {
    dateTimeStr: {
      type: String,
      default: '',
    },
    dateTimePlaceholder: {
      type: String,
      default: '请选择结束时间',
    },
    dateStyle: {
      type: String,
      default: 'width: 200px',
    },
  },
  methods: {
    init(){
      this.datetime = this.dateTimeStr ? this.$moment(this.dateTimeStr) : this. datetime
    },
    createTimeOnChange(date, dateString) {
      this.$emit('dateTime', dateString)
    },
    disabledDate(current) {
      const time = this.$moment().endOf('day').subtract(1, 'days')
      return current && current < time
    },
    rangeHours(start, end, value, chooseday, day) {
      const result = []
      if (chooseday === day) {
        for (let i = start; i < end; i++) {
          if (i < value) {
            result.push(i)
          }
        }
      }
      return result
    },
    rangeMinutes(start, end, value, chooseday, day, chooseh, h) {
      const result = []
      if (chooseday === day && chooseh === h) {
        for (let i = start; i < end; i++) {
          if (i < value) {
            result.push(i)
          }
        }
      }
      return result
    },
    rangeSeconds(start, end, value, chooseday, day, chooseh, h, choosem, m) {
      const result = []
      if (chooseday === day && chooseh === h && choosem === m) {
        for (let i = start; i < end; i++) {
          if (i < value) {
            result.push(i)
          }
        }
      }
      return result
    },
    disabledDateTime(date) {
      // 选中的时间
      const choosetime = this.$moment(date).format('HH-mm-ss')
      const chooseday = parseInt(this.$moment(date).format('YYYY-MM-DD').split('-')[2])
      const chooseh = parseInt(choosetime.split('-')[0])
      const choosem = parseInt(choosetime.split('-')[1])
      // 当前时间
      const nowtime = this.$moment().format('HH-mm-ss')
      const day = parseInt(this.$moment().format('YYYY-MM-DD').split('-')[2])
      const h = parseInt(nowtime.split('-')[0])
      const m = parseInt(nowtime.split('-')[1])
      const s = parseInt(nowtime.split('-')[2])
      return {
        disabledHours: () => this.rangeHours(0, 24, h, chooseday, day),
        disabledMinutes: () => this.rangeMinutes(0, 60, m, chooseday, day, chooseh, h),
        disabledSeconds: () => this.rangeSeconds(0, 60, s, chooseday, day, chooseh, h, choosem, m),
      }
    },
  },
}
</script>
