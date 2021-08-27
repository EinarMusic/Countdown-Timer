import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	state: {
		showSetting: null,
		countdown: [],
		events: [],
	},
	mutations: {
		forShowSetting(state, bool) {
			state.showSetting = bool;
		},
		createObjForEvent(state, obj) {
			state.countdown.push({
				event: obj.event,
				year: obj.year,
				month: obj.month,
				date: obj.date,
				hour: obj.hour,
				minutes: obj.minutes,
				forShowHour: obj.forShowHour,
				forShowMinutes: obj.forShowMinutes,
			});
		},
		EventComplete(state, countdownArrays) {
			let countdownArray = null;
			for (let value of countdownArrays) {
				countdownArray = value;
			}

			let index = state.countdown.findIndex((data) => {
				return (
					data.event == countdownArray.event &&
					data.date == countdownArray.date &&
					data.month == countdownArray.month + 1 &&
					data.year == countdownArray.year &&
					data.hour == countdownArray.hour &&
					data.minutes == countdownArray.minutes
				);
			});

			return state.events.push(state.countdown.splice(index, 1));
		},
		deleteEventComplete(state, event) {
			let index = state.events.findIndex((data) => {
				return data == event;
			});

			return state.events.splice(index, 1);
		},
	},
});
