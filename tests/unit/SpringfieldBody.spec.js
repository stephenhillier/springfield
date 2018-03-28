import { mount } from '@vue/test-utils'
import SpringfieldBody from '@/components/SpringfieldBody.vue'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

class LocalStorageMock {
  constructor () {
    this.store = {}
  }
  clear () {
    this.store = {}
  }
  getItem (key) {
    return this.store[key] || null
  }
  setItem (key, value) {
    this.store[key] = value
  }
  removeItem (key) {
    delete this.store[key]
  }
}

global.localStorage = new LocalStorageMock()

describe('SpringfieldBody.vue', () => {
  it('has a form', () => {
    const wrapper = mount(SpringfieldBody)
    expect(wrapper.findAll('form').length).toEqual(1)
  })
  it('has a table', () => {
    const wrapper = mount(SpringfieldBody)
    expect(wrapper.findAll('table').length).toEqual(1)
  })
  it('has a table', () => {
    const wrapper = mount(SpringfieldBody)
    wrapper.vm.signups = [
      {
        name: 'Person 1',
        email: 'person1@example.com',
        phone: '23143241',
        address: '21341234',
        interests: 'stuff'
      },
      {
        name: 'Person 2',
        email: 'person2@example.com',
        phone: '23143241',
        address: '21341234',
        interests: 'stuff'
      }
    ]
    expect(wrapper.findAll('table tr').length).toEqual(3)
    expect(wrapper.findAll('table tr').at(1).text()).toMatch('Person 1')
    expect(wrapper.findAll('table tr').at(2).text()).toMatch('Person 2')
  })
})
