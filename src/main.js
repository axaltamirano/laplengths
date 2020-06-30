import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
Vue.use(Vuex)

Vue.config.productionTip = false;

import * as lapLengthTable from 'laplengths-core';

const store = new Vuex.Store({
	state: {
		fc: 4000,
		fy: 60000,
		isMetric: false,
		codeEdition: "318-14",
		preset: "imperial",
		lightweightConcrete: false,
		epoxyCoatedRebar: false,
		epoxyCoverSatisfied: false,
		hookedCoverSatisfied: false,
		hookedConfinementSatisfied: false,
		compressionConfinementSatisfied: false,
		showCustomFc: false,
		showCustomFy: false,
		includeSeismicIncrease: false
	},
	getters: {
		table(state) {
			let args = {
				fc: state.fc,
				fy: state.fy,
				isMetric: state.isMetric,
				
				preset: state.preset,
				lightweightConcrete: state.lightweightConcrete,
				epoxyCoatedRebar: state.epoxyCoatedRebar,
				epoxyCoverSatisfied: state.epoxyCoverSatisfied,
				hookedCoverSatisfied: state.hookedCoverSatisfied,
				hookedConfinementSatisfied: state.hookedConfinementSatisfied,
				compressionConfinementSatisfied: state.compressionConfinementSatisfied,
				includeSeismicIncrease: state.includeSeismicIncrease
			}
			return new lapLengthTable(args).getTable()
		}
	},
	mutations: {
		updateFc(state, val) {
			state.fc = val
		},
		updateFy(state, val) {
			state.fy = val
		},
		updateIsMetric(state, val) {
			state.isMetric = val
			if (state.isMetric) {
				state.fc = 30
				state.fy = 420
				state.preset = 'softMetric'
			} else {
				state.fc = 4000
				state.fy = 60000
				state.preset = 'imperial'
			}
		},
		updateCodeEdition(state, val) {
			state.codeEdition = val
		},
		updatePreset(state, val) {
			state.preset = val
		},
		updateLightweightConcrete(state, val) {
			state.lightweightConcrete = val
		},
		updateEpoxyCoatedRebar(state, val) {
			state.epoxyCoatedRebar = val
		},
		updateEpoxyCoverSatisfied(state, val) {
			state.epoxyCoverSatisfied = val
		},
		updateHookedCoverSatisfied(state, val) {
			state.hookedCoverSatisfied = val
		},
		updateHookedConfinementSatisfied(state, val) {
			state.hookedConfinementSatisfied = val
		},
		updateCompressionConfinementSatisfied(state, val) {
			state.compressionConfinementSatisfied = val
		},
		updateShowCustomFc(state, val) {
			state.showCustomFc = val
		},
		updateShowCustomFy(state, val) {
			state.showCustomFy = val
		},
		updateIncludeSeismicIncrease(state, val) {
			state.includeSeismicIncrease = val
		}
	}
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
