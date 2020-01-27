<template>
  <div id="app">
    <section>
      <div class="container">
        <b-navbar>
          <template slot="end">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">App</b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/settings' }">Settings</b-navbar-item>
            <b-navbar-item href="#">Github</b-navbar-item>
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
        <div class="content has-text-centered">
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
