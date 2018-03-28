import { mount } from '@vue/test-utils'
import SpringfieldNav from '@/components/SpringfieldNav.vue'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

describe('SpringfieldNav.vue', () => {
  it('renders a title', () => {
    Vue.use(BootstrapVue)
    const wrapper = mount(SpringfieldNav)
    expect(wrapper.text()).toMatch('SPRINGFIELD')
  })
})
