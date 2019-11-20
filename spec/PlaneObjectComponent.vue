<template>
  <div>test</div>
</template>

<script>
export default {
  computed: {
    sayHello() {
      return 'Hello';
    }
  },
  created() {}, // eslint-disable-line @typescript-eslint/no-empty-function
  methods: {
    sayHi() {
      return 'Hi';
    }
  }
};
</script>
