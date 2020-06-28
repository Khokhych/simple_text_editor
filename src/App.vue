<template>
  <comp :dataA="dataAA" @ffff="change" />
</template>

<script>
import comp from "./components/comp/comp.vue";

export default {
  name: "app",
  data() {
    return {
      dataAA: ["2222222222"]
    };
  },
  methods: {
    change(e) {
      console.log(e);
    },
    elem() {
      let elem = this.$store.state.text;
      return elem;
      console.log("-------------------------", elem);
    }
  },
  components: {
    comp
  }
};
</script>