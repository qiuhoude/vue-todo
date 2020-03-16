import Vue from 'vue'

const compoent = {
  template: `
  <div>
      <input type="text" v-model.number="text">
      <span @click="handleChange">{{propOne}}</span>
      <span v-show="active">see me if active</span>
    </div>
  `,
  data() {
    return {
      text: 0,
    }
  },
  props: {
    active: {
      // type: Boolean,
      // default: true,
      validator (value) {
        return typeof value === 'boolean'
      }
    },
    propOne: String
  },

  methods: {
    handleChange() {
      this.$emit('change')
    }
  }
}

new Vue({
  el: '#root',
  components: {
    CompOne: compoent
  },
  data: {
    prop1: 'text1'
  },
  template: `
<div>
  <comp-one :active="true" :prop-one="prop1" @change="handleChange"></comp-one>
  <comp-one :active="true" propOne="text2"></comp-one>
</div>
  `,
  methods: {
    handleChange() {
      this.prop1 += 1
    }
  },
})
