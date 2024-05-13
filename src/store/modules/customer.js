// 客户管理
export const SET_CUSTOMER_STATUS = 'SET_CUSTOMER_STATUS';
const customer = {
  // 这里的初始化的值，请根据实际情况来填写初始类型，不全都是 undefined
  state: {
    selectLossStatus: undefined,
    selectAddWay: undefined,
    selectGender: undefined,
    searchName: undefined,
    endDate: undefined,
    startDate: undefined,
    customerTagInfo: {}, // 员工标签信息
    staffId: '', // 员工id
    searchNameMove: undefined,
    lossTimeFrom: undefined,
    lossTimeTo: undefined,
    addTimeTo: undefined,
    addTimeFrom: undefined,
    howManyDayTo: undefined,
    howManyDayFrom: undefined,
    customerStatus: undefined,
    channelId: undefined,
    staffUserid: undefined,
    customerTag: undefined,
    filterType: undefined,
    userIdList: undefined,
    groupName: undefined,
    groupOwnerId: undefined,
    groupTag: undefined,
    messageLogging: {},
    fistShowName: undefined,
    startTime: undefined,
    endTime: undefined,
    context: undefined,
    keyName: undefined,
    actionInfo: undefined,
  },
  mutations: {
    SET_ACTIONINFO(state, actionInfo){
      state.actionInfo = actionInfo
    },
    SET_KEYNAME(state, keyName) {
      state.keyName = keyName
    },
    SET_TIMERECORD(state, { startTime, endTime }) {
      state.startTime = startTime
      state.endTime = endTime
    },
    SET_CONTEXT(state, context) {
      state.context = context
    },
    SET_FISTSHOWNAME(state, fistShowName) {
      state.fistShowName = fistShowName
    },
    SET_MESSAGELOGGING(state, messageLogging) {
      state.messageLogging = messageLogging
    },
    SET_GROUPTAG(state, { groupTag, filterType }) {
      state.groupTag = groupTag
      state.filterType = filterType
    },
    SET_GROUPOWNERID(state, groupOwnerId) {
      state.groupOwnerId = groupOwnerId
    },
    SET_GROUPNAME(state, groupName) {
      state.groupName = groupName
    },
    SET_USERIDLIST(state, userIdList) {
      state.userIdList = userIdList
    },
    SET_CUSTOMERTAG(state, { customerTag, filterType }) {
      state.customerTag = customerTag
      state.filterType = filterType
    },
    SET_STAFFUSERID(state, staffUserid) {
      state.staffUserid = staffUserid
    },
    SET_CHANNELD(state, channelId) {
      state.channelId = channelId
    },
    SET_CUSTOMER_STATUS(state, customerStatus) {
      state.customerStatus = customerStatus
    },
    SET_LOSS_STATUS(state, selectLossStatus) {
      state.selectLossStatus = selectLossStatus
    },
    SET_ADD_WAY(state, selectAddWay) {
      state.selectAddWay = selectAddWay
    },
    SET_GENDER(state, selectGender) {
      state.selectGender = selectGender
    },
    SET_SEARCH_NAME(state, searchName) {
      state.searchName = searchName
    },
    SET_SEARCH_NAME_MOVE(state, searchNameMove) {
      state.searchNameMove = searchNameMove
    },
    SET_DATE(state, { endDate, startDate }) {
      state.endDate = endDate
      state.startDate = startDate
    },
    SET_CUSTOMER_INFO(state, info) {
      state.customerTagInfo = info
    },
    SET_STAFF_ID(state, staffId) {
      state.staffId = staffId
    },
    SET_LOSS_DATE(state, { lossTimeTo, lossTimeFrom }) {
      state.lossTimeTo = lossTimeTo
      state.lossTimeFrom = lossTimeFrom
    },
    SET_ADD_DATE(state, { addTimeTo, addTimeFrom }) {
      state.addTimeTo = addTimeTo
      state.addTimeFrom = addTimeFrom
    },
    SET_HOWMANY_DATE(state, { howManyDayFrom, howManyDayTo }) {
      state.howManyDayTo = howManyDayTo
      state.howManyDayFrom = howManyDayFrom
    }
  },
  actions: {
    [SET_CUSTOMER_STATUS](store, val) {
      store.commit(SET_CUSTOMER_STATUS, val);
    },
  }
}
export default customer