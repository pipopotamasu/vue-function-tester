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
    },
    count: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      output: '',
      updatedCount: 0,
      liked: false,
      loading: false
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
  watch: {
    count(newVal) {
      if (newVal % 15 === 0) {
        this.output = 'Fizz Buzz';
      } else if (newVal % 3 === 0) {
        this.output = 'Fizz';
      } else if (newVal % 5 === 0) {
        this.output = 'Buzz';
      } else {
        this.otherMethod();
      }
    }
  },
  async created() {
    this.loading = true;
    await this.asyncMethod();
    this.loading = false;
  },
  updated() {
    this.updatedCount++;
  },
  mounted() {
    this.otherMethod();
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
    },
    async asyncMethod() {
      let returnVal = '';
      const sleep = () =>
        new Promise((resolve) => {
          setTimeout(() => {
            returnVal = 'returned!';
            resolve();
          }, 100);
        });
      await sleep();
      return returnVal;
    }
  }
});
</script>
