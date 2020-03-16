import Vue from 'vue'

const ChildComponent = {
  template: '<div>child component: {{data.value}}</div>',
  inject: ['yeye', 'data'],
  mounted() {
    console.log("ChildComponent mounted() -->",this.yeye, this.value)
  }
}

const component = {
  name: 'comp',
  components: {
    ChildComponent
  },
  // template: `
  //   <div :style="style">
  //     <div class="header">
  //       <slot name="header"></slot>
  //     </div>
  //     <div class="body">
  //       <slot name="body"></slot>
  //     </div>
  //   </div>
  // `,
  template: `
    <div :style="style">
      <slot name="head" :value="value" aaa="111"></slot>
      <child-component />
    </div>
  `,
  data() {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'component value'
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  provide() {
    const data = {}
    let that = this
    // 绑定value属性
    Object.defineProperty(data, 'value', {
      get() {
        return that.value
      },
      enumerable: true
    })

    return {
      yeye: this,
      data
    }
  },
  el: '#root',
  data() {
    return {
      value: '123'
    }
  },
  mounted() {
    console.log(this.$refs.comp.value, this.$refs.span)
  },
  template: `
    <div>
      <comp-one ref="comp">
        <template #head="props">
         <span ref="span">{{props.value}} {{props.aaa}} {{value}}</span>
        </template> 
      </comp-one>
      <input type="text" v-model="value" />
    </div>
  `
})
