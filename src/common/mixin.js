import BackTop from "components/content/backTop/BackTop";

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowGoTop: false,
        }
    },
    methods: {
        goTop() {
            this.$refs.scroll.scroll.scrollTo(0, 0, 500);
        }
    }
}

export const tabControlMixin = {
	data: function () {
		return {
			currentType: POP
		}
	},
	methods: {
		tabClick(index) {
			switch (index) {
				case 0:
					this.currentType = POP
					break
				case 1:
					this.currentType = NEW
					break
				case 2:
					this.currentType = SELL
					break
			}
		}
	}
}