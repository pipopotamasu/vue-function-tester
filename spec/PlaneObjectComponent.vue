<template>
  <div>test</div>
</template>

<script lang="ts">
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
