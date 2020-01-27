<template>
	<div>
		<router-link to="/">Return to Table</router-link>
		<h3 class="title is-4">Settings</h3>
		<div class="columns">
			<div class="column is-half">
				<h4 class="subtitle is-5">General</h4>
				<b-field horizontal label="Code Edition">
					<b-select v-model="codeEdition">
						<option v-for="option in codeEditions" :value="option" :key="option">ACI {{option}}</option>
					</b-select>
				</b-field>
				<b-field horizontal label="Units">
					<b-select v-model="isMetric">
						<option value="false">Imperial (psi, in)</option>
						<option value="true">Metric (MPa, mm)</option>
					</b-select>
				</b-field>
				<b-field horizontal label="Preset">
					<b-select v-model="preset">
						<option value="imperial">Imperial</option>
						<option value="softMetric">Soft Metric</option>
						<option value="hardMetric">Hard Metric</option>
					</b-select>
				</b-field>
				<h4 class="subtitle is-5">Material Parameters</h4>
				<b-field horizontal label="f`c">
					<b-select v-model="fcSelect">
						<option v-for="option in fcSelectOptions" :value="option.value" :key="option.value">{{ option.displayName }}</option>
					</b-select>
					<b-input type="number" v-model="fc" v-show="showCustomFc"></b-input> 
				</b-field>
				<b-field horizontal label="fy">
					<b-select v-model="fySelect">
						<option v-for="option in fySelectOptions" :value="option.value" :key="option.value">{{ option.displayName }}</option>
					</b-select>
					<b-input type="number" v-model="fy" v-show="showCustomFy"></b-input> 
				</b-field>
				<div class="field">
					<b-switch v-model="lightweightConcrete">Is concrete light-weight?</b-switch>
				</div>
				<div class="field">
					<b-switch v-model="epoxyCoatedRebar">Is concrete epoxy-coated?</b-switch>
				</div>
				<div class="field" v-show="epoxyCoatedRebar">
					<b-switch v-model="epoxyCoverSatisfied">Do epoxy bars meet clear cover and spacing requirements of 
							<b-tooltip label="For a reduced 1.2 epoxy modification factor instead of 1.5, clear cover must be at least 3*db and clear spacing at least 6*db" multilined><a>Table 25.4.2.4?</a></b-tooltip>
					</b-switch>
				</div>
			</div>
			<div class="column is-half">
				<h4 class="subtitle is-5">Advanced Parameters</h4>
				<div class="field">
					<b-switch v-model="hookedCoverSatisfied">Do hooked bars meet clear cover and side cover requirements of
							<b-tooltip label="For a reduced 0.7 cover modification factor, side cover and clear cover need to meet table requirements" multilined><a>Table 25.4.3.2?</a></b-tooltip>
					</b-switch>
				</div>
				<div class="field">
					<b-switch v-model="hookedConfinementSatisfied">Do hooked bars meet confinement requirements of
							<b-tooltip label="For a reduced 0.8 confinement factor, hooks need to meet table requirements for confinement" multilined><a>Table 25.4.3.2?</a></b-tooltip>
					</b-switch>
				</div>
				<div class="field">
					<b-switch v-model="compressionConfinementSatisfied">Do transverse ties for compression development meet confirement requirements of 
							<b-tooltip label="For a reduced 0.75 confinement factor, tie type and spacing need to meet table requirements for confinement" multilined><a>Table 25.4.9.3?</a></b-tooltip>
					</b-switch>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data: () => {
	  return {
		  defaultsImperial: {
			  fc: [{
				  displayName: '3,000 psi',
				  value: 3000
			  }, {
				  displayName: '4,000 psi',
				  value: 4000
			  }, {
				  displayName: '5,000 psi',
				  value: 5000
			  }, {
				  displayName: '6,000 psi',
				  value: 6000
			  }, {
				  displayName: '7,000 psi',
				  value: 7000
			  }, {
				  displayName: '8,000 psi',
				  value: 8000
			  }, {
				  displayName: '10,000 psi',
				  value: 10000
			  }, {
				  displayName: 'Custom',
				  value: null
			  }],
			  fy: [{
				  displayName: '40,000 psi',
				  value: 40000
			  }, {
				  displayName: '60,000 psi',
				  value: 60000
			  }, {
				  displayName: '80,000 psi',
				  value: 80000
			  }, {
				  displayName: 'Custom',
				  value: null
			  }]
		  },
		  defaultsMetric: {
			  fc: [{
				  displayName: '30 MPa',
				  value: 30
			  }, {
				  displayName: '35 MPa',
				  value: 35
			  }, {
				  displayName: '40 MPa',
				  value: 40
			  }, {
				  displayName: '50 MPa',
				  value: 50
			  }, {
				  displayName: '60 MPa',
				  value: 60
			  }],
			  fy: [{
				  displayName: '275 MPa',
				  value: 275
			  }, {
				  displayName: '420 MPa',
				  value: 420
			  }, {
				  displayName: '550 MPa',
				  value: 550
			  }, {
				  displayName: 'Custom',
				  value: null
			  }]
		  },
		  codeEditions: ['318-11', '318-14']
	  }
  },
  computed: {
	  showCustomFc() {
		  return this.$store.state.showCustomFc
	  },
	  showCustomFy() {
		  return this.$store.state.showCustomFy
	  },
	  codeEdition: {
		  get() {
			  return this.$store.state.codeEdition
		  },
		  set(value) {
			  this.$store.commit('updateCodeEdition', value)
		  }
	  },
	  isMetric: {
		  get() {
			  return this.$store.state.isMetric
		  },
		  set(value) {
			  value = (value == 'true')
			  this.$store.commit('updateIsMetric', value)
		  }
	  },
	  preset: {
		  get() {
			  return this.$store.state.preset
		  },
		  set(value) {
			  this.$store.commit('updatePreset', value)
		  }
	  },
	  fc: {
		  get() {
			  return this.$store.state.fc
		  },
		  set(value) {
			  this.$store.commit('updateFc', value)
		  }
	  },
	  fcSelect: {
		  get() {
			let fc = this.$store.state.fc
			let fcInList = false

			let defaults = (this.isMetric)? this.defaultsMetric : this.defaultsImperial
			for (const option of defaults.fc)
			{
				if (option.value == fc)
				{
					fcInList = true
				}
			}
			return (fcInList)? fc : null
		  },
		  set(value) {
			  if (value != null)
			  {
				  this.$store.commit('updateFc', value)
				  this.$store.commit('updateShowCustomFc', false)
			  } else {
				  this.$store.commit('updateShowCustomFc', true)
			  }
		  }
	  },
	  fcSelectOptions() {
		let defaults = (this.isMetric)? this.defaultsMetric : this.defaultsImperial
		return defaults.fc
	  },
	  fy: {
		  get() {
			  return this.$store.state.fy
		  },
		  set(value) {
			  this.$store.commit('updateFy', value)
		  }
	  },
	  fySelect: {
		  get() {
			let fy = this.$store.state.fy
			let fyInList = false

			let defaults = (this.isMetric)? this.defaultsMetric : this.defaultsImperial
			for (const option of defaults.fy)
			{
				if (option.value == fy)
				{
					fyInList = true
				}
			}
			return (fyInList)? fy : null
		  },
		  set(value) {
			  if (value != null)
			  {
				  this.$store.commit('updateFy', value)
				  this.$store.commit('updateShowCustomFy', false)
			  } else {
				  this.$store.commit('updateShowCustomFy', true)
			  }
		  }
	  },
	  fySelectOptions() {
		  let defaults = (this.isMetric)? this.defaultsMetric : this.defaultsImperial
		  return defaults.fy
	  },
	  lightweightConcrete: {
		  get() {
			  return this.$store.state.lightweightConcrete
		  },
		  set(value) {
			  this.$store.commit('updateLightweightConcrete', value)
		  }
	  },
	  epoxyCoatedRebar: {
		  get() {
			  return this.$store.state.epoxyCoatedRebar
		  },
		  set(value) {
			  this.$store.commit('updateEpoxyCoatedRebar', value)
		  }
	  },
	  epoxyCoverSatisfied: {
		  get() {
			  return this.$store.state.epoxyCoverSatisfied
		  },
		  set(value) {
			  this.$store.commit('updateEpoxyCoverSatisfied', value)
		  }
	  },
	  hookedCoverSatisfied: {
		  get() {
			  return this.$store.state.hookedCoverSatisfied
		  },
		  set(value) {
			  this.$store.commit('updateHookedCoverSatisfied', value)
		  }
	  },
	  hookedConfinementSatisfied: {
		  get() {
			  return this.$store.state.hookedConfinementSatisfied
		  },
		  set(value) {
			  this.$store.commit('updateHookedConfinementSatisfied', value)
		  }
	  },
	  compressionConfinementSatisfied: {
		  get() {
			  return this.$store.state.compressionConfinementSatisfied
		  },
		  set(value) {
			  this.$store.commit('updateCompressionConfinementSatisfied', value)
		  }
	  }
  }
};
</script>
