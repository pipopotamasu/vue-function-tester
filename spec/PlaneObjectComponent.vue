<template>
  <div>test</div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      required: true
    }
  },
  computed: {
    sayHello() {
      return 'Hello';
    }
  },
  watch: {
    count() {} // eslint-disable-line @typescript-eslint/no-empty-function
  },
  mounted() {}, // eslint-disable-line @typescript-eslint/no-empty-function
  methods: {
    sayHi() {
      return 'Hi';
    }
  }
};
</script>
