<script setup>
import { ref, defineEmits } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  author: { type: String, default: "Anonymous" },
  year: { type: Number, default: 0 },
  image: { type: String, default: null, required: true },
  genre: { type: String, default: null }
})

const emit = defineEmits(["delete-book"])

const removeBook = ()=>{
  emit("delete-book")
}
const modalOpen = ref(false)
</script>

<template>
  <div class="book-wrapper">
    <div class="book-card" @click="modalOpen = true">

      <div class="book-card__thumb">
        <img v-if="image" :src="image" :alt="title" />
        <div v-else class="book-card__thumb--placeholder">
          <span>{{ title.charAt(0) }}</span>
        </div>
      </div>

      <div class="book-card__body">
        <h3 class="book-card__title">{{ title }}</h3>
        <span class="book-card__author">{{ author }}</span>
      </div>

      <div class="book-card__meta">
        <span class="book-card__year">{{ year }}</span>
        <span class="book-card__arrow">→</span>
      </div>

    </div>

    <Transition name="fade">
      <Teleport to="body">
        <aside v-if="modalOpen" class="modal-overlay" @click.self="modalOpen = false">
          <div class="modal-book">
            <button class="modal-book__close" @click="modalOpen = false">✕</button>

            <div class="modal-book__img">
              <img v-if="image" :src="image" :alt="title" />
              <div v-else class="modal-book__img--placeholder">
                <span>{{ title.charAt(0) }}</span>
              </div>
            </div>

            <div class="modal-book__info">
              <span class="modal-book__year">{{ year }}</span>
              <h2 class="modal-book__title">{{ title }}</h2>
              <p class="modal-book__author">{{ author }}</p>
              <span v-if="genre" class="modal-book__genre">{{ genre }}</span>
            </div>

            <div class="modal-book__actions">
              <button class="btn btn--primary">Add to reading list</button>
              <button class="btn btn--ghost">Mark as read</button>
              <button class="btn btn--ghost" @click="removeBook">Delete</button>
            </div>
          </div>
        </aside>
      </Teleport>
    </Transition>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Geist:wght@400;500;600&display=swap');

/* ── Card ── */
.book-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  font-family: 'Geist', sans-serif;
  position: relative;
}

.book-card:hover {
  border-color: #000;
  box-shadow: 0 0 0 1px #000;
  background: #fafafa;
}

.book-card:hover .book-card__arrow {
  opacity: 1;
  transform: translateX(0);
}

/* ── Thumbnail ── */
.book-card__thumb {
  width: 36px;
  height: 48px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid #e5e5e5;
}

.book-card__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-card__thumb--placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f0f0f0, #e5e5e5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Geist', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #bbb;
}

/* ── Body ── */
.book-card__body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.book-card__title {
  font-size: 13px;
  font-weight: 600;
  color: #111;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.01em;
}

.book-card__author {
  font-size: 11px;
  font-weight: 400;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Meta ── */
.book-card__meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
}

.book-card__year {
  font-family: 'Geist Mono', monospace;
  font-size: 10px;
  color: #bbb;
  letter-spacing: 0.05em;
}

.book-card__arrow {
  font-size: 13px;
  color: #111;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.15s ease, transform 0.15s ease;
}

/* ── Modal overlay ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

/* ── Modal panel ── */
.modal-book {
  position: relative;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 32px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: 'Geist', sans-serif;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
}

.modal-book__close {
  position: absolute;
  top: 16px;
  right: 16px;
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
}

.modal-book__close:hover {
  border-color: #000;
  color: #111;
}

/* ── Modal image ── */
.modal-book__img {
  width: 100%;
  aspect-ratio: 2 / 3;
  max-height: 220px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
}

.modal-book__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-book__img--placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f5f5, #ebebeb);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Geist', sans-serif;
  font-size: 48px;
  font-weight: 700;
  color: #ccc;
  letter-spacing: -0.04em;
}

/* ── Modal info ── */
.modal-book__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.modal-book__year {
  font-family: 'Geist Mono', monospace;
  font-size: 11px;
  color: #999;
  letter-spacing: 0.05em;
}

.modal-book__title {
  font-size: 20px;
  font-weight: 600;
  color: #111;
  letter-spacing: -0.02em;
  margin: 0;
}

.modal-book__author {
  font-size: 13px;
  color: #888;
  margin: 0;
}

.modal-book__genre {
  margin-top: 6px;
  display: inline-block;
  font-family: 'Geist Mono', monospace;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #999;
  border: 1px solid #e5e5e5;
  border-radius: 999px;
  padding: 3px 10px;
}

/* ── Actions ── */
.modal-book__actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.btn {
  width: 100%;
  padding: 10px 16px;
  font-family: 'Geist', sans-serif;
  font-size: 13px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  border: 1px solid transparent;
}

.btn--primary {
  background: #111;
  color: #fff;
  border-color: #111;
}

.btn--primary:hover {
  background: #333;
  border-color: #333;
}

.btn--ghost {
  background: #fff;
  color: #111;
  border-color: #e5e5e5;
}

.btn--ghost:hover {
  border-color: #111;
}

/* ── Transition ── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>