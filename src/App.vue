<template>
  <comp :elem="elem" :propsButtons="propsButtons" :selectIsText="selectIsText" @ffff="change" />
</template>

<script>
import comp from "./components/comp/comp.vue";

export default {
  name: "app",
  data() {
    return {
      dataAA: ["2222222222"],
      elem: [
        {
          text: "Enter text",
          fontSize: "18",
          color: "#000000",
          BGColor: "#ffffff"
        }
      ],
      propsButtons: {
        fontSize: 18,
        color: "#000000",
        BGColor: "#ffffff"
      },
      selectIsText: false,
      params: null,
      indexlastEditElement: null,
      indexCaret: null,
      caretData: null
    };
  },

  methods: {
    change(e) {
      console.log(e);
    },
    elem() {
      let elem = this.$store.state.text;
      return elem;
    }
  },
  components: {
    comp
  }
};
</script>