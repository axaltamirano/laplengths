<template>
  <div id="app">
    <section>
      <div class="container">
        <b-navbar>
          <template slot="end">
			  <div class="buttons">
        		<b-navbar-item class="button is-primary" tag="router-link" :to="{ path: '/settings' }">
					<b-icon icon="cogs" size="is-small"></b-icon>
					<span>Settings</span>
				</b-navbar-item>
            	<b-navbar-item class="button is-dark" href="https://github.com/axaltamirano/laplengths" target="_blank">
					<b-icon icon="github-circle" size="is-small"></b-icon>
					<span>Github</span>
				</b-navbar-item>
			  </div>
          </template>
        </b-navbar>
      </div>
    </section>
    <section class="section" id="main">
      <div class="container">
        <h1 class="title">Rebar Development Length Calculator</h1>
        <h4 class="subtitle">
          Using ACI {{ codeEdition }} provisions
        </h4>
        <router-view />
      </div>
    </section>
    <footer class="footer">
      <div class="container">
        <div class="content is-small">
          <p>
            The information presented on this page has been prepared in
            accordance with recognized engineering principles and is for general
            information only. While it is believed to be accurate, this
            information should not be used or relied upon for any specific
            application without competent professional examination and
            verification of its accuracy, suitability, and applicability by a
            licensed professional engineer.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
	  codeEdition: {
		  get() {
			  return this.$store.state.codeEdition
		  }
	  }
  }
};
</script>

<style lang="scss"></style>
