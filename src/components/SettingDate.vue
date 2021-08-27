<template>
	<div>
		<div class="wrap-all" v-if="showSetting">
			<div class="date-content">
				<div class="btn-done">
					<div class="wrap-done" @click="createObjAndHandleShowSetting()">
						<p>Done</p>
					</div>
				</div>
				<div class="name-event">
					<input v-model="event" type="text" placeholder="Event Name" />
				</div>
				<div class="content-al-datetime">
					<div class="date-setting">
						<label>Date</label>
						<input v-model="date" type="date" required />
						<span v-if="message">no puedes ir al pasado</span>
					</div>
					<div class="hours-setting">
						<label for="hours">Hours</label>
						<input v-model="time" type="time" value="09:40" required />
						<span v-if="messageTime">adelante tu reloj</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
	data() {
		return {
			event: "",
			date: null,
			time: null,
			message: false,
			messageTime: false,
		};
	},
	computed: {
		...mapState(["showSetting", "countdown"]),
	},
	methods: {
		...mapMutations(["forShowSetting", "createObjForEvent"]),
		createObjAndHandleShowSetting() {
			let date = new Date();
			//prettier-ignore
			let year = parseInt(Array.from(this.date).slice(0, 4).join(""));
			//prettier-ignore
			let month = parseInt(Array.from(this.date).slice(5, 7).join(''));
			//prettier-ignore
			let day = parseInt(Array.from(this.date).slice(8).join(''));
			//prettier-ignore
			let hour = parseInt(Array.from(this.time).join(''));

			//prettier-ignore
			if (year >= date.getFullYear() && month >= date.getMonth() + 1 && day >= date.getDate()) {
				

			this.createObjForEvent({
				event: this.event,
				//prettier-ignore
				year: Array.from(this.date).slice(0, 4).join(''),
				//prettier-ignore
				month: Array.from(this.date).slice(5, 7).join(''),
				//prettier-ignore
				date: Array.from(this.date).slice(8).join(''),
				//prettier-ignore
				hour: Array.from(this.time).slice(0, 2).join(''),
				//prettier-ignore
				minutes: Array.from(this.time).slice(3).join(''),
				// para mostrar correctamente la hora;
				forShowHour: new Date().getHours(),
				forShowMinutes: new Date().getMinutes(),
			});

			this.forShowSetting(false);
			this.event = "";
			this.date = "";
			this.time = "";

			} else if (year > date.getFullYear()) {

			this.createObjForEvent({
				event: this.event,
				//prettier-ignore
				year: Array.from(this.date).slice(0, 4).join(''),
				//prettier-ignore
				month: Array.from(this.date).slice(5, 7).join(''),
				//prettier-ignore
				date: Array.from(this.date).slice(8).join(''),
				//prettier-ignore
				hour: Array.from(this.time).slice(0, 2).join(''),
				//prettier-ignore
				minutes: Array.from(this.time).slice(3).join(''),
				// para mostrar correctamente la hora;
				forShowHour: new Date().getHours(),
				forShowMinutes: new Date().getMinutes(),
			});

			this.forShowSetting(false);
			this.event = "";
			this.date = "";
			this.time = "";


			} else if (year < date.getFullYear()) {
				this.message = true;
			} else if (day == date.getDate() && hour < date.getHours()) {
				this.messageTime = true;
			}
		},
	},
};
</script>

<style scoped>
.wrap-all {
	display: flex;
	justify-content: center;
	align-items: center;

	width: 100%;
	height: 100vh;

	position: absolute;
	top: 0;

	padding: 0 15px;
}

.date-content {
	width: 100%;
	padding-bottom: 10px;

	border: 1px solid black;
	background: white;
}

.btn-done {
	display: flex;
	flex-direction: row-reverse;

	padding: 10px 15px 0 0;
}

.wrap-done {
	width: 45px;
	height: 45px;

	border-radius: 50%;
	background-color: #f2f2f2;

	display: flex;
	justify-content: center;
	align-items: center;

	cursor: pointer;
}

.wrap-done p {
	font-size: 13px;
}

.name-event {
	display: flex;
	justify-content: center;
	padding: 0 20px;
}

.name-event input {
	border: none;
	outline: none;

	font-size: 20px;
	border-bottom: 1px solid #667;
	text-align: center;
	padding-bottom: 10px;
	width: 100%;
}

.content-al-datetime {
	display: flex;
	justify-content: space-around;
	align-items: center;

	width: 100%;

	margin-top: 20px;
}

.date-setting {
	height: 70px;
	width: 200px;

	display: flex;
	flex-direction: column;
}

.date-setting span,
.hours-setting span {
	color: red;
	font-size: 13px;
}

.hours-setting {
	display: flex;
	flex-direction: column;

	height: 70px;
	width: 100px;
}

.date-setting label,
.hours-setting label {
	display: block;

	font-size: 13px;
	color: #667;

	margin-bottom: 5px;
}

.date-setting input,
.hours-setting input {
	outline: none;
	border: none;

	font-size: 20px;
}

input::-webkit-calendar-picker-indicator {
	display: none;
}
</style>
