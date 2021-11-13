<template>
  <div class="signup">
    <h2><center v-pre>Hello User!</center></h2>
    <Form @submit="handleRegister" :validation-schema="schema">
      <div v-if="!successful">
        <div class="form-group">
          <label for="username">Username</label>
          <Field name="username" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <Field name="email" type="email" class="form-control" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <Field name="password" type="password" class="form-control" />
        </div>
        <div class="form-group">
          <label for="phoneNumber">Phone Number</label>
          <Field name="phoneNumber" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label for="profession">Profession</label>
          <Field name="profession" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <Field name="description" type="textarea" class="form-control" />
        </div>
        <br />
        <ul class="error-box">
          <ErrorMessage as="p" name="username" class="error-feedback" />
          <ErrorMessage as="p" name="email" class="error-feedback" />
          <ErrorMessage as="p" name="password" class="error-feedback" />
          <ErrorMessage as="p" name="phoneNumber" class="error-feedback" />
          <ErrorMessage as="p" name="profession" class="error-feedback" />
          <ErrorMessage as="p" name="description" class="error-feedback" />
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
  name: "SignupUser",
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
      phoneNumber: yup.string().required("Phone Number is Required!"),
      profession: yup.string().required("Profession is Required!"),
      description: yup.string().required("Description is Required!"),
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
    handleRegister(user) {
      user.role = ["user"];
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
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
