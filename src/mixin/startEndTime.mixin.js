/**
 *  时间控件，控制开始和结束时间不能违背事实
 * */
import { endTimeVerification } from '@/utils/dateformat'
export default {
  methods: {
    changeStartTime(detailData) {
      console.log(detailData)
      if (detailData.endTime) {
        const flag = endTimeVerification(detailData?.startTime?.format('HH:mm'), detailData?.endTime?.format('HH:mm'), 'start')
        if (flag) {
          detailData.startTime = undefined
          this.$message.warning('开始时间不能大于结束时间')
        }
      }
    },
    changeEndTime(detailData) {
      if (detailData.startTime) {
        const flag = endTimeVerification(detailData?.startTime.format('HH:mm'), detailData?.endTime?.format('HH:mm'), 'start')
        if (flag) {
          detailData.endTime = undefined
          this.$message.warning('结束时间不能小于开始时间')
        }
      }
    },
  }
}