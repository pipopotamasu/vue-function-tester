<template>
  <div>test</div>
</template>

<script lang="ts">
import Vue from 'vue';

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
  // TODO: resolve typescript issue
  // beforeRouteEnter(_to: string, _from: string, next: Function) {
  //   next();
  // },
  methods: {
    sayHi() {
      return 'Hi!';
    },
    sayHiWithName(firstname: string, lastname: string) {
      return `Hi, ${firstname} ${lastname}!`;
    },
    like() {
      this.liked = true;
    },
    callOtherMethod() {
      return this.otherMethod();
    },
    otherMethod() {
      // called by other methods
    },
    emitEvent() {
      this.$emit('some-event', 'value');
    }
  }
});
</script>
