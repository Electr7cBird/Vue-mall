const mutations = {
    addCart(state, info) {
        // 1.查看是否添加过
        const oldInfo = state.cartList.find(item => item.iid === info.iid)

        // 2.+1或者新添加
        if (oldInfo) {
            oldInfo.count += 1
        } else {
            info.count = 1
            info.checked = true  // 用于之后购物车界面是否为选中状态使用
            state.cartList.push(info)
        }
    }
}

export default mutations