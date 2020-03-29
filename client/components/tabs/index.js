import Tabs from './tabs.vue'
import Tab from './tab.vue'


export default (Vue) => {
  Vue.component(Tabs.name, Tabs)
  Vue.component(Tab.name, Tab)
}

/*
解析的样式
    <tabs>
      <tab lable="text">
        <span slot="label"></span>
        <p>This is tab content</p>
      </tab>
    </tabs>
    <ul>
      <li>label</li>
      <li>label2</li>
    </ul>
    <div class="tab-container">
      <p>This is tab content</p>
    </div>
 */
