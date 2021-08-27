import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Header from "../components/BarHeader";
import car from "../components/CarEventDate";
import date from "../components/SettingDate";
import complete from "../components/EventComplete";

export default new VueRouter({
	mode: "history",
	routes: [
		{ path: "/", component: Header },
		{ path: "/car", component: car },
		{ path: "/date", component: date },
		{ path: "/complete", component: complete },
		{ path: "*", redirect: "/" },
	],
});
