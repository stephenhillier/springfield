<template>
  <b-container>
    <b-row>
      <b-col>
        <h1 class="h1 text-primary mt-3">Springfield Community Centre</h1>
        <p class="text-dark">
          The Springfield Community Centre is a multi-purpose recreational space for residents of Springfield.
        </p>
        <p class="text-dark">
          <b-badge pill variant="info">Fun fact</b-badge> Did you know? We are the only community centre in all of Springfield!
        </p>
        <b-card title="Sign up for activities" class="my-3">
          <p class="text-dark">You can now sign up to receive notifications when activities become available!</p>
          <b-form @submit.prevent="signUp()" @reset.prevent="resetForm()">
            <b-form-row>
              <b-col xs="12" md="5">
                <b-form-group id="nameInputGroup"
                            label="Your name:"
                            label-for="nameInput">
                  <b-form-input id="nameInput"
                                type="text"
                                v-model="form.name"
                                required
                                placeholder="Enter name">
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col xs="12" md="5" offset-md="1">
                <b-form-group id="emailInputGroup"
                              label="Email:"
                              label-for="emailInput">
                  <b-form-input id="emailInput"
                                type="email"
                                v-model="form.email"
                                required
                                placeholder="Enter email">
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-form-row>
            <b-form-row>
              <b-col xs="12" md="5">
                <b-form-group id="phoneInputGroup"
                              label="Telephone:"
                              label-for="phoneInput">
                  <b-form-input id="phoneInput"
                                type="text"
                                v-model="form.phone"
                                required
                                placeholder="Enter phone number">
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col xs="12" md="5" offset-md="1">
                <b-form-group id="addressInputGroup"
                            label="Your address:"
                            label-for="addressInput">
                  <b-form-input id="addressInput"
                                type="text"
                                v-model="form.address"
                                required
                                placeholder="Enter address">
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-form-row>
            <b-form-row>
              <b-col xs="12" md="11">
                <b-form-group id="interestInputGroup"
                              label="Interests:"
                              label-for="interestInput">
                  <b-form-select id="interestInput"
                                multiple
                                :select-size='5'
                                :options="interestOptions"
                                required
                                v-model="interestSelect">
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-form-row>
            <b-form-row>
              <b-col xs="12" md="5" class="my-3">
                <b-button type="submit" variant="primary" class="m-1">Submit</b-button>
                <b-button type="reset" variant="muted" class="m-1">Reset</b-button>
                <b-button type="button" variant="success" class="my-1 mx-3" @click="randomName()">Random</b-button>
              </b-col>
              <b-col xs12 md="7" class="my-3">
                <b-alert :show="signUpDismissCountdown"
                        dismissible
                        variant="success"
                        @dismissed="signUpDismissCountdown=0">
                  Success! You have signed up.
                </b-alert>
              </b-col>
            </b-form-row>
          </b-form>
        </b-card>
        <b-card title="For instructors" class="my-3">
          <b-row>
            <b-col xs="12" md="10">
              <p class="text-dark">Find out who is interested in courses you teach:</p>
            </b-col>
            <b-col xs="12" md="2">
              <b-button type="button" variant="danger" class="my-3" @click="clearSignUps()">Clear all</b-button>
            </b-col>
          </b-row>
          <b-table :items="signups" responsive></b-table>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      interestSelect: [],
      form: {
        name: '',
        email: '',
        interests: ''
      },
      interestOptions: [
        'photography',
        'swimming',
        'yoga',
        'martial arts',
        'food'
      ],
      signups: [],
      signUpDismissCountdown: 0
    }
  },
  methods: {
    resetForm () {
      this.form = {
        name: '',
        email: '',
        phone: '',
        address: '',
        interests: ''
      }
      this.interestSelect = []
    },
    signUp () {
      this.signups.push(this.form)
      this.form.interests = this.interestSelect.join(', ')
      localStorage.setItem('springfieldSignUps', JSON.stringify(this.signups))
      this.signUpDismissCountdown = 2
      this.resetForm()
    },
    randomName () {
      axios.get('https://randomuser.me/api/?nat=CA')
        .then((response) => {
          const data = response.data.results[0]
          this.form.name = `${_.startCase(data.name.first)} ${_.startCase(data.name.last)}`
          this.form.email = data.email
          this.form.phone = data.phone
          this.form.address = `${_.startCase(data.location.street)}, ${_.startCase(data.location.city)}`
        })
    },
    clearSignUps () {
      this.signups = []
      localStorage.removeItem('springfieldSignUps')
    }
  },
  created () {
    const prevSignUps = JSON.parse(localStorage.getItem('springfieldSignUps'))
    if (prevSignUps) {
      this.signups = prevSignUps
    }
  }
}
</script>
<style scoped lang="scss">
p {
  font-size: 1.1rem;
}
</style>
