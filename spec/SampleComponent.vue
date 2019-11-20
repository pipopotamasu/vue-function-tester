<template>
  <div>test</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      updatedCount: 0,
      liked: false
    };
  },
  // TODO: resolve typescript issue
  // beforeRouteEnter(_to: string, _from: string, next: Function) {
  //   next();
  // },
  computed: {
    sayHello() {
      return 'Hello!';
    },
    displayName: {
      get() {
        return `Mr. ${this.name}`;
      },
      set(newName: string) {
        this.$emit('change-name', newName);
      }
    }
  },
  created() {
    this.otherMethod();
  },
  updated() {
    this.updatedCount++;
  },
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
