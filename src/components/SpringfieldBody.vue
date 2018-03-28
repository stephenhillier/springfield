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
        <b-card bg-variant="secondary" text-variant="dark" title="Sign up for activities" class="my-3">
          <p>You can now sign up to receive notifications when activities become available!</p>
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
                                placeholder="Enter email"
                                :state="emailNotAlreadyUsed">
                  </b-form-input>
                    <b-form-invalid-feedback id="emailInputFeedback">
                      Email already registered
                    </b-form-invalid-feedback>
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
                <b-button type="reset" variant="info" class="m-1 mr-3">Reset</b-button>
                <b-button type="button" variant="success" class="m-1" @click="randomName()">Random</b-button>
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
          <b-table :items="signups" responsive id="signupTable"></b-table>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
export default {
  name: 'SpringfieldBody',
  data () {
    return {

      // form value objects
      // interestSelect stores the "interest" selections and then is joined into one string
      // before being inserted into the form.interests property.
      interestSelect: [],
      form: {
        name: '',
        email: '',
        phone: '',
        address: '',
        interests: ''
      },

      // list of possible interests that a user can pick from
      interestOptions: [
        'photography',
        'swimming',
        'yoga',
        'martial arts',
        'food'
      ],

      // signups: an array that holds all signed up users (this mocks a list we would receive from an API)
      signups: [],

      // countdown for the auto-dismissing sign-up success alert box.
      signUpDismissCountdown: 0
    }
  },
  computed: {
    emailNotAlreadyUsed () {
      // returns null if email not found in signups array, returns false if email was already used.
      return !~this.signups.findIndex((person) => this.form.email === person.email) ? null : false
    }
  },
  methods: {
    resetForm () {
      // reset form to default, empty values
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
      // when user signs up, push onto the signups array then store in localStorage
      this.signups.push(this.form)
      this.form.interests = this.interestSelect.join(', ')
      localStorage.setItem('springfieldSignUps', JSON.stringify(this.signups))
      this.signUpDismissCountdown = 2
      this.resetForm()
    },
    randomName () {
      // get some random user data from randomuser.me and load it into form
      axios.get('https://randomuser.me/api/?nat=US')
        .then((response) => {
          const data = response.data.results[0]
          this.form.name = `${_.startCase(data.name.first)} ${_.startCase(data.name.last)}`
          this.form.email = data.email
          this.form.phone = data.phone
          this.form.address = `${_.startCase(data.location.street)}, ${_.startCase(data.location.city)}, ${_.startCase(data.location.state)}`
          this.interestSelect = [this.interestOptions[Math.floor(Math.random() * this.interestOptions.length)]]
        })
    },
    clearSignUps () {
      this.signups = []
      localStorage.removeItem('springfieldSignUps')
    }
  },
  created () {
    // when app loads, load previous signups from localStorage
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
