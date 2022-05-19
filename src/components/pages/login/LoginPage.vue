<template>
  <div class="login-page" tabindex="-1" >
    <login-background></login-background>
    
    <transition name="fade">
      <form
        v-show="!$store.state.loggedIn"
        class="login-card"
        @submit.prevent="login()"
        aria-label="Login form"
        aria-live="assertive"
      >
      
        <h1>Login</h1>

        <label for="login-email">Email address</label>
        <input
          id="login-email"
          name="email"
          type="email"
          autocomplete="email"
          placeholder=""
          v-model="email"
          required
          :disabled="$store.state.loggedIn"
          aria-describedby="login-email-error"
        />
        <span id="login-email-error" class="email-error"></span>

        <label for="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          autocomplete="current-password"
          placeholder=""
          pattern="((?=.*\d)(?=.*[\W]).{8,})"
          minlength="8"
          v-model="password"
          required
          :disabled="$store.state.loggedIn"
          aria-describedby="login-password-desc"
        />
        <span id="login-password-desc" class="password-desc"
          >Must contain at least 8 characters, one digit and one symbol
        </span>

        <button
          ref="login"
          class="mars-button login-button"
          type="submit"
          :disabled="loading || $store.state.loggedIn"
        >
          Login
        </button>

        <div
          class="login-scrim"
          aria-hidden="true"
          v-show="loading || $store.state.loggedIn"
        />

        <div
          aria-label="Loading"
          role="progressbar"
          class="spinner-colored login-spinner"
          v-show="loading"
        />

      </form>
    </transition>

    <transition name="fade" >
      <form class="logout-card" v-show="$store.state.loggedIn" aria-label="Logout form">
        <h2>Logout</h2>
        <span class="logged-in-message"
          >You are logged in as
          <strong>
            {{ $store.state.credentials?.username }}
          </strong></span
        >
        <button
          type="button"
          ref="logout"
          class="mars-button-outlined logout-button"
          @click="logout()"
          :disabled="loading || !$store.state.loggedIn"
        >
          Logout
        </button>
      </form>
    </transition>
  </div>
</template>

<script lang="ts">
import { Credentials, delay } from "@/assets/js/utils";
import { defineComponent } from "vue";
import LoginBackground from "./LoginBackground.vue";

/**
 * @deprecated The email pattern is checked with html now
 */
const emailPattern =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default defineComponent({
  name: "LoginPage",
  components: { LoginBackground },

  data() {
    return {
      loading: false,
      email: this.$store.state.credentials?.username || "",
      password: this.$store.state.credentials?.password || "",
    };
  },
  computed: {
    /**
     * @deprecated Validation can be entirely done in Html
     */
    emailError(): string {
      return this.email.length > 0 && emailPattern.exec(this.email) == null
        ? "Please enter a valid email"
        : "";
    },
     /**
     * @deprecated Validation can be entirely done in Html
     */
    passwordError(): string {
      return this.password.length > 0 && this.password.length < 4
        ? "Please enter a more robust password"
        : "";
    },
     /**
     * @deprecated Validation can be entirely done in Html
     */
    loginFormIsValid(): boolean {
      return (
        this.email !== "" &&
        this.emailError === "" &&
        this.password !== "" &&
        this.passwordError === ""
      );
    },
  },
  methods: {
    async login() {
      if (!this.loginFormIsValid) return;

      this.loading = true;

      await delay(400);
      this.$store.commit("login", new Credentials(this.email, this.password));
      this.$nextTick(() => (this.$refs["logout"] as HTMLElement).focus());

      this.loading = false;
    },
    async logout() {
      this.loading = true;

      await delay(200);
      this.$store.commit("logout");
      this.$nextTick(() => (this.$refs["login"] as HTMLElement).focus());

      this.loading = false;
    },
  },
});
</script>

<style lang="scss">
@use "@/assets/css/mixins.scss";


.login-page {
  position: relative;
  display: flex;
  flex-direction: column;
}



/************************ */
/*******  Login card ******/

.login-card,
.logout-card {
  width: 100%;
  max-width: 24rem;

  padding: 2rem 2.5rem;
  margin: 2rem auto;
  *min-height: 24rem;

  position: relative;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  border-radius: 5px;
  box-shadow: 0 0 8px #88747488;
  background-color: var(--color-surface);
}

.login-card > * {
  //If clamp is not supported, there are workarounds
  width: 100%;
  box-sizing: border-box;
}

.login-card > h1,
.logout-card > h2 {
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--color-primary);
   
  
}

.login-button,
.logout-button {
  margin-top: 1.5rem;
}

.login-card > label {
  margin-block-start: 1rem;
}

.login-card > span {
  margin-top: 0.3rem;
  margin-bottom: 0.6rem;
  font-size: 0.9rem;
}

.login-scrim {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--background-color);
  opacity: 0.6;
}

.login-spinner {
  position: absolute;
  top: 50%;
  margin: 0 auto;
  height: 2.5rem;
  width: 2.5rem;
  align-self: center;
  transition: opacity 100ms;
}

.logout-card {
  position: absolute;
  align-self: center;
}

.logout-card > .logged-in-message {
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  text-align:center;
  color: var(--text-color-primary);
  word-break: break-word;
}

/******** Transitions *********/
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease;
}
</style>