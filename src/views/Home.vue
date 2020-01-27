<template>
  <table class="table is-fullwidth is-hoverable">
	  <thead>
		  <tr>
			  <th rowspan="3">Bar Size</th>
			  <th rowspan="3">Diameter ({{distanceUnit}})</th>
			  <th rowspan="3">Area ({{distanceUnit}}<sup>2</sup>)</th>
			  <th colspan="7">f`<sub>c</sub> = {{ fc }} {{ strengthUnit }}</th>
		  </tr>
		  <tr>
			  <th colspan="2">TOP BARS</th>
			  <th colspan="2">OTHER BARS</th>
			  <th colspan="2">COMPRESSION</th>
			  <th>HOOKED BARS</th>
		  </tr>
		  <tr>
			  <th>Ldt ({{distanceUnit}})</th>
			  <th>Lbt ({{distanceUnit}})</th>
			  <th>Ld ({{distanceUnit}})</th>
			  <th>Lb ({{distanceUnit}})</th>
			  <th>Ldc ({{distanceUnit}})</th>
			  <th>Lbc ({{distanceUnit}})</th>
			  <th>Ldh ({{distanceUnit}})</th>
		  </tr>
	  </thead>
	  <tbody>
		  <tr v-for="row in table" :key="row.barSize">
			  <td>{{row.barSize}}</td>
			  <td>{{row.db}}</td>
			  <td>{{row.area}}</td>
			  <td>{{row.tensionTop.Ldt.meetsCover}} ({{row.tensionTop.Ldt.doesNotMeetCover}})</td>
			  <td v-if="row.tensionTop.Lbt.meetsCover != 0">{{row.tensionTop.Lbt.meetsCover}} ({{row.tensionTop.Lbt.doesNotMeetCover}})</td>
			  <td v-else>-</td>
			  <td>{{row.tensionOther.Ld.meetsCover}} ({{row.tensionOther.Ld.doesNotMeetCover}})</td>
			  <td v-if="row.tensionOther.Lb.meetsCover != 0">{{row.tensionOther.Lb.meetsCover}} ({{row.tensionOther.Lb.doesNotMeetCover}})</td>
			  <td v-else>-</td>
			  <td>{{row.compression.Ldc}}</td>
			  <td v-if="row.compression.Lbc != 0">{{row.compression.Lbc}}</td>
			  <td v-else>-</td>
			  <td>{{row.tensionHook.Ldh}}</td>
		  </tr>
	  </tbody>
  </table>
</template>

<script>

export default {
  name: "home",
  computed: {
	  table() {
		  return this.$store.getters.table
	  },
	  fc() {
		  return this.$store.state.fc
	  },
	  strengthUnit() {
		  return (this.$store.state.isMetric)? 'MPa' : 'psi'
	  },
	  distanceUnit() {
		  return (this.$store.state.isMetric)? 'mm' : 'in'
	  }
  }
};
</script>

<style>
	.table th, .table td {
		vertical-align: middle;
		text-align: center !important
	}
</style>
