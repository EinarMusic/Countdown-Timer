<template>
	<div>
		<div class="wrap-all">
			<div class="header-bar">
				<div class="brand">
					<h1>Countdown Timer</h1>
				</div>
				<div class="btn-add">
					<div class="wrap-btn-add" @click="handleForShowSetting()">
						<i class="fa fa-plus " aria-hidden="true"></i>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
	methods: {
		...mapMutations(["forShowSetting"]),
		handleForShowSetting() {
			this.forShowSetting(true);
		},
	},
};
</script>

<style scoped>
.header-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: nowrap;

	width: 100%;
	height: 48px;
	padding: 0 15px;

	color: #667;
}

.brand h1 {
	font-size: 22px;
}

.wrap-btn-add {
	border-radius: 50%;
	background-color: #f5f3f3;

	height: 30px;
	width: 30px;

	display: flex;
	align-items: center;
	justify-content: center;

	cursor: pointer;
}
</style>
