<template>
  <form novalidate @submit.prevent="validateUser">
    <md-card class=" md-large-size-50 md-medium-size-100">
      <md-card-header>
        <div class="md-title">{{ form.type === types.toggle ? 'Toggle' : 'Timer' }}</div>
      </md-card-header>

      <md-card-content>
        <md-field :class="getValidationClass('title')">
          <label for="first-name">Title</label>
          <md-input name="first-name" id="first-name" v-model="form.title"
                    :disabled="sending"/>
        </md-field>
        <md-field :class="getValidationClass('type')">
          <label for="first-name">Type</label>
          <md-select name="type" id="type" v-model="form.type"
                     :disabled="sending">
            <md-option :value="types.timer">Timer</md-option>
            <md-option :value="types.toggle">Toggle</md-option>
          </md-select>
        </md-field>
        <div class="md-layout md-gutter" v-show="form.type === types.toggle">

          <div class="md-layout-item">

            <md-field :class="getValidationClass('value1')">

              <label for="value1">Odd value</label>
              <md-input id="value1" v-model="form.value1" :disabled="sending"/>
            </md-field>
          </div>

          <div class=" md-layout-item">
            <md-field :class="getValidationClass('value2')">
              <label for="value2">Even value</label>
              <md-input id="value2" v-model="form.value2" :disabled="sending"/>
            </md-field>
          </div>
        </div>
        <md-field :class="getValidationClass('color')">
          <label for="color">Color</label>
          <md-input type="color" name="color" id="color" v-model="form.color"
                    :disabled="sending"/>
        </md-field>
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
  import actions from '@/storeActions'


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
        this.form.value1 = null;
        this.form.value2 = null;
        this.form.color = null;
      },
      saveUser() {
        this.sending = true;

        this.$store.dispatch(actions.CREATE_TIMER, this.form);
        this.timerSaved = true;
        this.sending = false;
        this.clearForm();
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
