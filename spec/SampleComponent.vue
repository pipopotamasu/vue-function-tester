<template>
  <div>test</div>
</template>

<script lang="ts">
// FIXME: use esmodules
const Vue = require('vue');

export default Vue.extend({
  data() {
    return {
      updatedCount: 0,
      liked: false
    };
  },
  created() {
    this.otherMethod();
  },
  updated() {
    this.updatedCount++;
  },
  beforeRouteEnter(_to: string, _from: string, next: Function) {
    next();
  },
  methods: {
    sayHi() {
      return 'Hi!';
    },
    sayHiWithName(firstname: string, lastname: string) {
      return `Hi, ${firstname} ${lastname}!`;
    },
    like() {
      (this as any).liked = true;
    },
    callOtherMethod() {
      return this.otherMethod();
    },
    otherMethod() {
      // called by other methods
    },
    emitEvent() {
      (this as any).$emit('some-event', 'value');
    }
  }
});
</script>
