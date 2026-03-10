<script setup>
import { ref } from 'vue'
import api from '../data/api'

//events
const emit = defineEmits(["book-added"])
const modalOpen = ref(false)

const handleModal = ()=>{
    modalOpen.value = !modalOpen.value
}
const close = ()=>{
    modalOpen.value = false
}

//inputs
const titleBook = ref("")
const authorInput = ref("")
const yearInput = ref(0)
const genreInput = ref("")
const imageUrlInput = ref("")


const addBook = async()=>{
    //input data
    const newBook = {
        title: titleBook.value,
        author: authorInput.value,
        year: yearInput.value,
        genre: genreInput.value,
        imageUrl: imageUrlInput.value
    }

    try {
        const res = await api.post(`/books`, newBook, {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })

        console.log('Book added', res.data)
        emit("book-added")
        close()
    } catch (err) {
        console.error('Error to add book', err.res?.data || err.message)
    }
}

defineExpose({ handleModal })

</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <aside v-if="modalOpen" class="modal-overlay" @click.self="close">
        <div class="modal-add">

          <div class="modal-add__header">
            <div>
              <span class="modal-add__tag">Library</span>
              <h2 class="modal-add__title">Add a book</h2>
            </div>
            <button class="modal-add__close" @click="close">✕</button>
          </div>

          <Transition name="fade">
            <div v-if="error" class="modal-add__error">
              <span class="error__icon">!</span>
              <p class="error__text">{{ error }}</p>
            </div>
          </Transition>

          <form class="modal-add__form" @submit.prevent="addBook">

            <div class="form-row">
              <div class="field">
                <label class="field__label" for="title">Title</label>
                <input id="title" v-model="titleBook" class="field__input" type="text"
                  placeholder="The Great Gatsby" required />
              </div>
              <div class="field">
                <label class="field__label" for="author">Author</label>
                <input id="author" v-model="authorInput" class="field__input" type="text"
                  placeholder="F. Scott Fitzgerald" required />
              </div>
            </div>

            <div class="form-row">
              <div class="field">
                <label class="field__label" for="year">Year</label>
                <input id="year" v-model="yearInput" class="field__input" type="number"
                  placeholder="1925" min="0" max="2099" required />
              </div>
              <div class="field">
                <label class="field__label" for="genre">Genre</label>
                <input id="genre" v-model="genreInput" class="field__input" type="text"
                  placeholder="Fiction" required />
              </div>
            </div>

            <div class="field">
              <label class="field__label" for="image">Image URL</label>
              <input id="image" v-model="imageUrlInput" class="field__input" type="url"
                placeholder="https://example.com/cover.jpg" />
            </div>

            <div class="modal-add__actions">
              <button type="button" class="btn btn--ghost" @click="close">Cancel</button>
              <button type="submit" class="btn btn--primary" :disabled="loading">
                <span v-if="!loading">Add book</span>
                <span v-else class="btn__loader" />
              </button>
            </div>

          </form>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Geist:wght@400;500;600&display=swap');

/* ── Trigger ── */
.btn-add-trigger {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  background: #111;
  color: #fff;
  border: 1px solid #111;
  border-radius: 6px;
  font-family: 'Geist', sans-serif;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  letter-spacing: -0.01em;
}

.btn-add-trigger:hover {
  background: #333;
  border-color: #333;
}

.btn-add-trigger__icon {
  font-size: 16px;
  font-weight: 300;
  line-height: 1;
}

/* ── Overlay ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 24px;
}

/* ── Panel ── */
.modal-add {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 32px;
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: 'Geist', sans-serif;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
}

/* ── Header ── */
.modal-add__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.modal-add__tag {
  display: inline-block;
  font-family: 'Geist Mono', monospace;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 6px;
}

.modal-add__title {
  font-size: 20px;
  font-weight: 600;
  color: #111;
  letter-spacing: -0.02em;
  margin: 0;
}

.modal-add__close {
  background: none;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: #888;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
  flex-shrink: 0;
}

.modal-add__close:hover {
  border-color: #000;
  color: #111;
}

/* ── Error ── */
.modal-add__error {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: #fff5f5;
  border: 1px solid #fecaca;
  border-radius: 6px;
}

.error__icon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #e5484d;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.error__text {
  font-size: 12px;
  color: #c0353a;
  margin: 0;
}

/* ── Form ── */
.modal-add__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

/* ── Fields ── */
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
  padding: 9px 12px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  width: 100%;
  resize: none;
}

.field__input::placeholder { color: #ccc; }

.field__input:focus {
  border-color: #111;
  box-shadow: 0 0 0 1px #111;
}

.field__textarea {
  resize: vertical;
  min-height: 80px;
  line-height: 1.5;
}

/* ── Actions ── */
.modal-add__actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  padding-top: 4px;
}

.btn {
  font-family: 'Geist', sans-serif;
  font-size: 13px;
  font-weight: 500;
  padding: 9px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 90px;
  min-height: 36px;
}

.btn--primary {
  background: #111;
  color: #fff;
  border-color: #111;
}

.btn--primary:hover:not(:disabled) {
  background: #333;
  border-color: #333;
}

.btn--primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn--ghost {
  background: #fff;
  color: #111;
  border-color: #e5e5e5;
}

.btn--ghost:hover { border-color: #111; }

/* ── Spinner ── */
.btn__loader {
  width: 13px;
  height: 13px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ── Transition ── */
.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>