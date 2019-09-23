<template>
  <div>test</div>
</template>

<script lang="ts">
import Vue from 'vue';
console.log(Vue)
export default Vue.extend({
  methods: {
    sayHi () {
      return 'Hi';
    }
  }
})
</script>