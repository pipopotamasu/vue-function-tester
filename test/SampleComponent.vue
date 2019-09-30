<template>
  <div>test</div>
</template>

<script lang="ts">
// FIXME: use esmodules
const Vue = require('vue');

export default Vue.extend({
  data () {
    return {
      updatedCount: 0,
      liked: false
    }
  },
  created () {
    this.otherMethod();
  },
  updated () {
    this.updatedCount++;
  },
  beforeRouteEnter () {
    this.otherMethod();
  },
  methods: {
    sayHi () {
      return 'Hi';
    },
    sayHiWithName(firstname: string, lastname: string) {
      return `Hi, ${firstname} ${lastname}`
    },
    like () {
      (this as any).liked = true;
    },
    callOtherMethods () {
      return this.otherMethod();
    },
    otherMethod () {
      // called by other methods
    }
  }
})
</script>