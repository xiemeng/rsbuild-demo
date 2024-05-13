// 企业风控
const enterpriseRiskControl = {
    state: {
        staffIds: '', // 用户id
        responseData: undefined, // 返回数据
    },
    mutations: {
        SET_STAFFIDS(state, staffIds){
            state.staffIds = staffIds
        },
        SET_RESPONSEDATA(state, responseData){
            state.responseData = responseData
        }
    }
}
export default enterpriseRiskControl