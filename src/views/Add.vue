<template>
  <form novalidate class="md-layout" @submit.prevent="validateUser">
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>
        <div class="md-title">Timer</div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('title')">
              <label for="first-name">Title</label>
              <md-input name="first-name" id="first-name" v-model="form.title"
                        :disabled="sending"/>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('type')">
              <label for="first-name">Type</label>
              <md-select name="type" id="type" v-model="form.type"
                         :disabled="sending">
                <md-option :value="types.timer">Timer</md-option>
                <md-option :value="types.toggle">Toggle</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout md-gutter">

            <div class="md-layout-item md-small-size-100">

              <md-field :class="getValidationClass('value1')">

                <label for="value1">Odd value</label>
                <md-input id="value1" v-model="form.value1" :disabled="sending"/>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('value2')">
                <label for="value2">Even value</label>
                <md-input id="value2" v-model="form.value2" :disabled="sending"/>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('color')">
                <label for="color">Color</label>
                <md-input type="color" name="color" id="color" v-model="form.color"
                          :disabled="sending"/>
              </md-field>
            </div>
          </div>
        </div>
      </md-card-content>

      <md-progress-bar md-mode="indeterminate" v-if="sending"/>

      <md-card-actions>
        <md-button type="submit" class="md-primary" :disabled="sending">Add timer</md-button>
      </md-card-actions>
    </md-card>

    <md-snackbar :md-active.sync="timerSaved">The timer {{ lastTimer }} was saved with success!</md-snackbar>
  </form>

</template>

<script>
  import TYPES from '@/components/Types.js';
  import {validationMixin} from 'vuelidate'
  import {required} from 'vuelidate/lib/validators'


  export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    data: () => ({
      form: {
        title: null,
        type: null,
        value1: null,
        value2: null,
        color: "#fff",
      },
      types: TYPES,
      timerSaved: false,
      sending: false,
      lastTimer: null
    }),
    validations: {
      form: {
        title: {
          required,
        },
        type: {
          required,
        },
        value1: {},
        value2: {},
        color: {}
      }
    },
    methods: {
      getValidationClass(fieldName) {
        const field = this.$v.form[fieldName];

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm() {
        this.$v.$reset();
        this.form.title = null;
        this.form.type = null;
        this.form.age = null;
        this.form.gender = null;
        this.form.email = null;
      },
      saveUser() {
        this.sending = true;

        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.lastUser = `${this.form.title} ${this.form.type}`;
          this.userSaved = true;
          this.sending = false;
          this.clearForm();
        }, 1500)
      },
      validateUser() {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    }
  }
</script>
