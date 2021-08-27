<template>
	<div>
		<BarHeader />
		<EventComplete :eventComplete="EventComplete" />
		<div class="wrap-all">
			<div class="car-wrap" v-for="count in countdownArray" :key="count.id">
				<div v-if="count.event">
					<div class="name-event">
						<h2>{{ count.event }}</h2>
					</div>
					<div class="main-content">
						<div class="days-content">
							<h2>{{ count.dayForEnd }}</h2>
							<span>days</span>
						</div>
						<div class="hours-content">
							<h2>{{ count.hour }}</h2>
							<span>hours</span>
						</div>
						<div class="minutes-content">
							<h2>{{ count.minutes }}</h2>
							<span>minutes</span>
						</div>
						<div class="seconds-content">
							<h2>{{ count.seconds }}</h2>
							<span>seconds</span>
						</div>
					</div>
					<div class="show-date">
						<p>
							{{ new Date(count.year, count.month, count.date).toDateString() }}
						</p>
					</div>
				</div>
			</div>
		</div>
		<SettingDate />
	</div>
</template>

<script>
import BarHeader from "./BarHeader";
import SettingDate from "./SettingDate";
import EventComplete from "./EventComplete";

import { mapState, mapMutations } from "vuex";

export default {
	components: { BarHeader, SettingDate, EventComplete },
	data() {
		return {
			countdownArray: [],
			eventComplete: [],
			completeEvents: [],
			bool: false,
		};
	},
	computed: {
		...mapState(["countdown"]),
	},
	created() {
		setInterval(() => {
			this.countdownArray = this.countdown.map((data) => {
				let date = new Date();
				let hour = date.getHours();
				let minutes = date.getMinutes();

				date.setDate(
					date.getDate() + this.calcularDate(data.year, data.month, data.date)
				);

				//prettier-ignore
				let todayAndHourEventCreate = (parseInt(hour) - parseInt(data.forShowHour));
				let userHour = parseInt(data.hour);
				if (todayAndHourEventCreate + userHour > 23) userHour = 0;

				//prettier-ignore
				let todayAndMinutesEventCreate = (parseInt(minutes) - parseInt(data.forShowMinutes));
				let userMinutes = parseInt(data.minutes);
				if (todayAndMinutesEventCreate + userMinutes > 59) userMinutes = 0;

				//for event complete
				if (
					this.calcularDate(data.year, data.month, data.date) == 0 &&
					data.hour == hour &&
					data.minutes == minutes
				) {
					this.bool = true;
				} else {
					this.bool = false;
				}

				return {
					event: data.event,
					dayForEnd: this.calcularDate(data.year, data.month, data.date),
					year: date.getFullYear(),
					month: date.getMonth(),
					date: date.getDate(),
					hour: todayAndHourEventCreate + userHour,
					minutes: todayAndMinutesEventCreate + userMinutes,
					seconds: date.getSeconds(),
				};
			});

			//event complete
			if (this.bool == true) {
				this.EventComplete(this.countdownArray);
				this.bool = false;
			}
		}, 1000);
	},
	methods: {
		...mapMutations(["EventComplete"]),
		calcularDate(user_year, user_month, user_day) {
			//today
			let mes, hoy, month, fecha;
			mes = 30.4167;
			hoy = new Date();
			month = hoy.getMonth() + 1;
			//prettier-ignore
			fecha = Math.round((month * mes) + hoy.getDate());

			//user date
			let nueva, user;
			nueva = new Date(user_year, user_month, user_day);
			//prettier-ignore
			user = Math.round((nueva.getMonth() * mes) + nueva.getDate());

			//
			return user - fecha;
		},
		showEventComplete() {
			let countdown = null;
			for (let value of this.countdown) {
				countdown = value;
			}

			let index = this.countdownArray.findIndex((data) => {
				return (
					data.dayForEnd == 0 &&
					data.hour == countdown.hour &&
					data.minutes == countdown.minutes
				);
			});

			this.eventComplete.push(
				this.countdownArray.splice(index, 1).find((data) => data)
			);

			return this.eventComplete;
		},
	},
};
</script>

<style scoped>
.wrap-all {
	padding: 0 15px;
}

.car-wrap {
	width: 100%;
	padding: 10px 0;
	margin-bottom: 10px;

	text-align: center;

	background-color: #006699;
	color: white;
}

.main-content {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: nowrap;

	margin: 20px 0;
}

.days-content,
.hours-content,
.minutes-content,
.seconds-content {
	width: 80px;
}

.days-content h2,
.hours-content h2,
.minutes-content h2 {
	border-right: 1px solid white;
}

.main-content h2 {
	font-size: 35px;
}

.main-content span {
	font-size: 12px;
}
</style>
