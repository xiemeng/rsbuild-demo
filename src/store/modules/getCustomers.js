// 引流获客

const getCustomers = {
    state: {
        stateNumber: undefined,
        customerSource: undefined,
        context: undefined,
        startTime: undefined,
        endTime: undefined,
        names: undefined
    },
    mutations: {
        SET_NAMES(state, names) {
            state.names = names
        },
        SET_TIMEGETCUSTOMERS(state, { startTime, endTime }) {
            state.startTime = startTime
            state.endTime = endTime
        },
        SET_STATENUMBER(state, stateNumber) {
            state.stateNumber = stateNumber
        },
        SET_CUSTOMERSOURCE(state, customerSource) {
            state.customerSource = customerSource
        },
        SET_CONTEXT(state, context) {
            state.context = context
        },
    },
    actions: {

    }
}
export default getCustomers