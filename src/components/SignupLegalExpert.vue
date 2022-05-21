<template>
  <div class="signup">
    <h2><center v-pre>Hello Expert!</center></h2>
    <Form @submit="handleRegister" :validation-schema="schema">
      <div v-if="!successful">
        <!-- NAME -->
        <div class="form-group">
          <label for="username">Username</label>
          <Field name="username" type="text" class="form-control" />
        </div>
        <!-- EMAIL -->
        <div class="form-group">
          <label for="email">Email</label>
          <Field name="email" type="email" class="form-control" />
        </div>
        <!-- PASSWORD -->
        <div class="form-group">
          <label for="password">Password</label>
          <Field name="password" type="password" class="form-control" />
        </div>
        <!-- PHONE NUMBER -->
        <div class="form-group">
          <label for="phoneNumber">Phone Number</label>
          <Field name="phoneNumber" type="text" class="form-control" />
        </div>
        <!-- PROFESSION -->
        <div class="form-group">
          <label for="profession">Profession</label>
          <Field name="profession" type="text" class="form-control" />
        </div>
        <!-- DESCRIPTION -->
        <div class="form-group">
          <label for="description">Description</label>
          <Field name="description" type="textarea" class="form-control" />
        </div>
        <!-- DOMAIN SPECIALIZATION -->
        <div class="form-group">
          <label for="domainSpecialization">Domain Specialization</label>
          <Field
            name="domainSpecialization"
            type="textarea"
            class="form-control"
          />
        </div>
        <!-- CITY -->
        <div class="form-group">
          <label for="city">City</label>
          <Field name="city" type="textarea" class="form-control" />
        </div>
        <!-- STATE -->
        <div class="form-group">
          <label for="state">State</label>
          <Field name="state" type="textarea" class="form-control" />
        </div>
        <!-- COUNTRY -->
        <div class="form-group">
          <label for="country">Country</label>
          <Field name="country" type="textarea" class="form-control" />
        </div>
        <!-- EXPERIENCE -->
        <div class="form-group">
          <label for="experience">Experience</label>
          <Field name="experience" type="textarea" class="form-control" />
        </div>
        <!-- CLIENT PROBLEMS -->
        <div class="form-group">
          <label for="clientProblems">Client Problems</label>
          <Field name="clientProblems" type="textarea" class="form-control" />
        </div>
        <!-- TARGET CLIENTS -->
        <div class="form-group">
          <label for="targetClients">Target Clients</label>
          <Field name="targetClients" type="textarea" class="form-control" />
        </div>
        <!-- TAGLINE -->
        <div class="form-group">
          <label for="tagline">Tagline</label>
          <Field name="tagline" type="textarea" class="form-control" />
        </div>
        <!-- KEYWORDS -->
        <div class="form-group">
          <label for="keywords">Keywords</label>
          <Field name="keywords" type="textarea" class="form-control" />
        </div>
        <br />
        <ul class="error-box">
          <ErrorMessage as="p" name="username" class="error-feedback" />
          <ErrorMessage as="p" name="email" class="error-feedback" />
          <ErrorMessage as="p" name="password" class="error-feedback" />
          <ErrorMessage as="p" name="phoneNumber" class="error-feedback" />
          <ErrorMessage as="p" name="profession" class="error-feedback" />
          <ErrorMessage as="p" name="description" class="error-feedback" />
          <ErrorMessage
            as="p"
            name="domainSpecialization"
            class="error-feedback"
          />
          <ErrorMessage as="p" name="city" class="error-feedback" />
          <ErrorMessage as="p" name="state" class="error-feedback" />
          <ErrorMessage as="p" name="country" class="error-feedback" />
          <ErrorMessage as="p" name="experience" class="error-feedback" />
          <ErrorMessage as="p" name="clientProblems" class="error-feedback" />
          <ErrorMessage as="p" name="targetClients" class="error-feedback" />
          <ErrorMessage as="p" name="tagline" class="error-feedback" />
          <ErrorMessage as="p" name="keywords" class="error-feedback" />
        </ul>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            Sign Up
          </button>
        </div>
      </div>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </Form>
    <br />
    Already have an account?&nbsp;&nbsp;<router-link :to="{ name: 'Login' }"
      >Login Here</router-link
    >
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "SignupLegalExpert",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Username must be at least 3 characters!")
        .max(20, "Username must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Email must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Password must be at least 6 characters!")
        .max(40, "Password must be maximum 40 characters!"),
      phoneNumber: yup.string().required("Phone Number is required!"),
      profession: yup.string().required("Profession is required!"),
      description: yup.string().required("Description is required!"),
      domainSpecialization: yup
        .string()
        .required("Domain Specialization is required!"),
      city: yup.string().required("City is required!"),
      state: yup.string().required("State is required!"),
      country: yup.string().required("Country is required!"),
      experience: yup
        .string()
        .required("Experience is required!")
        .min(60, "Experience must be at least 60 characters!"),
      clientProblems: yup
        .string()
        .required("Client Problems is required!")
        .min(60, "Client Problems must be at least 60 characters!"),
      targetClients: yup
        .string()
        .required("Target Clients is required!")
        .min(60, "Target Clients must be at least 60 characters!"),
      tagline: yup.string().required("Tagline is required!"),
      keywords: yup.string().required("Keywords are required!"),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister(expert) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      //we call the store, mainly an action
      //and then the action calls the service
      //then it makes the necessary commit
      this.$store.dispatch("auth/registerExpert", expert).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          //new legal expert has been added to the list, update the store data
          //here I am dispatching an action
          //that action calls the user service
          //and then it commits an mutation
          this.$store.dispatch("user/updateLegalExperts");
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
};
</script>

<style>
.error-box {
  background-color: #f8d7da;
  color: #842029;
  border-radius: 10px;
  padding: 10px 0 10px 15px;
}
.error-box p {
  margin-bottom: 1px;
  margin-left: 3px;
  display: list-item;
  list-style-type: disc;
  list-style-position: inside;
}
</style>
