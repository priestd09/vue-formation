<template lang="jade">
  div(id='app')
    router-link(to='/bootstrap') &nbsp;&nbsp;&nbsp;Bootstrap
    span &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    router-link(to='/materialize') Materialize
    hr
    router-view
</template>

<style>
  html {
    height: 100%;
  }
  body {
    height: 100%;
  }
</style>
