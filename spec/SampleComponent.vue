<template>
  <div>test</div>
</template>

<script>
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
  beforeRouteEnter(_to, _from, next) {
    next();
  },
  computed: {
    sayHello() {
      return 'Hello!';
    },
    displayName: {
      get() {
        return `Mr. ${this.name}`;
      },
      set(newName) {
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
    sayHiWithName(firstname, lastname) {
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
