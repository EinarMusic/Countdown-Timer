<template>
	<div>
		<div class="wrap-all" v-for="event in events.flat()" :key="event.id">
			<div class="event-complete">
				<div class="message-event">
					<p>{{ event.event }}</p>
				</div>
				<div class="time-event">
					<p>
						{{ new Date(event.year, event.month, event.date).toDateString() }}
					</p>
					<div class="style-btn" @click="deleteEvent(event)">
						<i class="fa fa-times fa-lg" aria-hidden="true"></i>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
	computed: {
		...mapState(["events"]),
	},
	methods: {
		...mapMutations(["deleteEventComplete"]),
		deleteEvent(event) {
			this.deleteEventComplete(event);
		},
	},
};
</script>

<style scoped>
.wrap-all {
	padding: 5px 15px;
}

.event-complete {
	display: flex;
	justify-content: space-around;
	align-items: center;

	width: 100%;
	height: 38px;

	background-color: red;
	color: white;
}

.time-event p {
	display: inline-block;
	margin-right: 15px;
}

.style-btn {
	cursor: pointer;
	display: inline-block;

	border-radius: 50%;

	text-align: center;
}
</style>
