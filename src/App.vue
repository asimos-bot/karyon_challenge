<template>
  <div id="app" :class="navbar">
    <Navbar class="hero-head" v-if="this.$route.name!='login'"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar
  },
  computed: {
    navbar: function(){
      const isLoginPage = this.$router.name == 'login'
      return {
        "is-fullheight-with-navbar": isLoginPage,
        "is-fullheight": !isLoginPage,
        "has-background-dark": true,
        "hero": true
      }
    }
  }
};
</script>

<style lang="scss">
@import "./styles/theme.scss";
</style>