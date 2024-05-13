// 客户管理
const groupList = {
    state: {
        owners: {},
        searchName: '',
        filterType: 0,
        filterBitMaps: '',
        selectGroupStatus: '',
        selectOrderCondition: '',
        selectOrderWay: '',
        date: '',
        isRefresh: ''
    },
    mutations: {
        SET_ISREFRESH(state, isRefresh) {
            state.isRefresh = isRefresh
        },
        SET_OWNERS(state, owners) {
            state.owners = owners
        },
        SET_GRUOP_NAME(state, searchName) {
            state.searchName = searchName
        },
        SET_FILTER_TYPE(state, { filterType, filterBitMaps }) {
            state.filterType = filterType
            state.filterBitMaps = filterBitMaps
        },
        SET_GROUP_STATUS(state, selectGroupStatus) {
            state.selectGroupStatus = selectGroupStatus
        },
        SET_ORDER_CONDITION(state, selectOrderCondition) {
            state.selectOrderCondition = selectOrderCondition
        },
        SET_ORDER_WAY(state, selectOrderWay) {
            state.selectOrderWay = selectOrderWay
        },
        SET_GROUP_DATE(state, date) {
            state.date = date
        }
    }
}
export default groupList