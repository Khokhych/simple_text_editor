<template>
  <comp :elem="elem" :propsButtons="propsButtons" :selectIsText="selectIsText" />
</template>

<script>
import comp from "./components/comp/comp.vue";

export default {
  name: "app",
  data() {
    return {
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
      selectIsText: 0,
      params: null,
      indexlastEditElement: null
    };
  },

  methods: {},
  components: {
    comp
  }
};
</script>