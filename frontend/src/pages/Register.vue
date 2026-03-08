<script setup>
import { ref } from 'vue'
import api from '../data/api';

const email = ref("")
const password = ref("")


const handleSubmit = async()=>{
  const res = await api.post("/auth/register", {
    email: email.value,
    password: password.value
  })

  localStorage.setItem("token", res.data.token)

  router.push("/books")
}
</script>

<template>
  <main class="auth">

    <div class="auth__card">

      <!-- Header -->
      <div class="auth__header">
        <span class="auth__tag">Bookshelf</span>
        <h1 class="auth__title">Create account</h1>
        <p class="auth__sub">Start tracking your reading journey</p>
      </div>

      <!-- Success state -->
      <Transition name="fade">
        <div v-if="submitted" class="auth__success">
          <span class="success__icon">✓</span>
          <p class="success__text">Account created — <a href="/login" class="auth__link">Sign in</a></p>
        </div>
      </Transition>

      <!-- Form -->
      <Transition name="fade">
        <form v-if="!submitted" class="auth__form" @submit.prevent="handleSubmit">

          <div class="field">
            <label class="field__label" for="name">Full name</label>
            <input
              id="name"
              v-model="form.name"
              class="field__input"
              type="text"
              placeholder="Jane Doe"
              required
              autocomplete="name"
            />
          </div>

          <div class="field">
            <label class="field__label" for="email">Email</label>
            <input
              id="email"
              v-model="form.email"
              class="field__input"
              type="email"
              placeholder="jane@example.com"
              required
              autocomplete="email"
            />
          </div>

          <div class="field">
            <label class="field__label" for="password">Password</label>
            <input
              id="password"
              v-model="form.password"
              class="field__input"
              type="password"
              placeholder="Min. 8 characters"
              required
              minlength="8"
              autocomplete="new-password"
            />
          </div>

          <button class="btn-submit" type="submit" :disabled="loading">
            <span v-if="!loading">Create account</span>
            <span v-else class="btn-submit__loader" />
          </button>

          <p class="auth__footer">
            Already have an account?
            <a href="/login" class="auth__link">Sign in</a>
          </p>

        </form>
      </Transition>

    </div>

  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Geist:wght@400;500;600&display=swap');

*,
*::before,
*::after { box-sizing: border-box; }

/* ── Page ── */
.auth {
  min-height: 100vh;
  background: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-family: 'Geist', sans-serif;
}

/* ── Card ── */
.auth__card {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* ── Header ── */
.auth__header {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.auth__tag {
  font-family: 'Geist Mono', monospace;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #999;
}

.auth__title {
  font-size: 22px;
  font-weight: 600;
  color: #111;
  letter-spacing: -0.03em;
  margin: 0;
}

.auth__sub {
  font-size: 13px;
  color: #888;
  margin: 0;
}

/* ── Form ── */
.auth__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ── Field ── */
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field__label {
  font-size: 12px;
  font-weight: 500;
  color: #444;
  letter-spacing: -0.01em;
}

.field__input {
  font-family: 'Geist', sans-serif;
  font-size: 13px;
  color: #111;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  padding: 10px 12px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  width: 100%;
}

.field__input::placeholder {
  color: #ccc;
}

.field__input:focus {
  border-color: #111;
  box-shadow: 0 0 0 1px #111;
}

/* ── Submit ── */
.btn-submit {
  margin-top: 4px;
  width: 100%;
  padding: 11px 16px;
  background: #111;
  color: #fff;
  border: 1px solid #111;
  border-radius: 6px;
  font-family: 'Geist', sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
}

.btn-submit:hover:not(:disabled) {
  background: #333;
  border-color: #333;
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Spinner */
.btn-submit__loader {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ── Footer ── */
.auth__footer {
  font-size: 12px;
  color: #999;
  text-align: center;
  margin: 0;
}

.auth__link {
  color: #111;
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px solid #e5e5e5;
  transition: border-color 0.15s;
}

.auth__link:hover {
  border-color: #111;
}

/* ── Success ── */
.auth__success {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px;
  background: #f9f9f9;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
}

.success__icon {
  font-size: 13px;
  color: #111;
  font-weight: 600;
}

.success__text {
  font-size: 13px;
  color: #555;
  margin: 0;
}

/* ── Transitions ── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>