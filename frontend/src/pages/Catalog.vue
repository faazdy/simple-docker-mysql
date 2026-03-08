<script setup>
import { ref, computed, onMounted } from 'vue'
import Book from '../components/Book.vue'
import Nav from '../components/Nav.vue'
import api from '../data/api'

const filters = ref([])
const activeFilter = ref('All')
const books = ref([])

const filtered = computed(() =>
  activeFilter.value === 'All'
    ? books.value
    : books.value.filter(b => b.genre === activeFilter.value)
)

const loadBooksAPI = async () => {
  const res = await api.get("/books/allbooks")
  books.value = res.data

  const genre = [...new Set(books.value.map(item => item.genre))]
  genre.unshift("All")
  filters.value = genre
}

onMounted(() => {
  loadBooksAPI()
})

const cardClass = (index) => {
  if (index % 7 === 0) return 'explore-card--tall'
  if (index % 7 === 3) return 'explore-card--wide'
  return ''
}
</script>

<template>
  <main class="catalog">

    <header class="catalog__header">
      <div>
        <span class="catalog__tag">Discover</span>
        <h1 class="catalog__title">Catalogue</h1>
      </div>
      <p class="catalog__sub">{{ filtered.length }} books available</p>
    </header>

    <nav class="catalog__filters">
      <button
        v-for="f in filters"
        :key="f"
        class="filter-pill"
        :class="{ 'filter-pill--active': activeFilter === f }"
        @click="activeFilter = f"
      >
        {{ f }}
      </button>
    </nav>

    <section class="explore-grid">
      <div
        v-for="(book, i) in filtered"
        :key="book.id"
        class="explore-card"
        :class="cardClass(i)"
      >
        <!-- Imagen de fondo si existe -->
        <div
          class="explore-card__bg"
          :style="book.image ? `background-image: url(${book.image})` : ''"
          :class="{ 'explore-card__bg--image': book.image }"
        />
        <div v-if="book.image" class="explore-card__overlay" />

        <div class="explore-card__content">
          <span
            class="explore-card__genre"
            :class="{ 'explore-card__genre--light': book.image }"
          >
            {{ book.genre }}
          </span>
          <Book
            :title="book.title"
            :author="book.author"
            :year="book.year"
            :image="book.image"
            :genre="book.genre"
          />
        </div>
      </div>
    </section>

  </main>

  <Nav />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Geist:wght@400;500;600&display=swap');

*,
*::before,
*::after { box-sizing: border-box; }

/* ── Layout ── */
.catalog {
  min-height: 100vh;
  background: #f9f9f9;
  font-family: 'Geist', sans-serif;
  padding: 64px 48px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* ── Header ── */
.catalog__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e5e5;
}

.catalog__tag {
  display: inline-block;
  font-family: 'Geist Mono', monospace;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 8px;
}

.catalog__title {
  font-size: 28px;
  font-weight: 600;
  color: #111;
  letter-spacing: -0.03em;
  margin: 0;
  line-height: 1.2;
}

.catalog__sub {
  font-family: 'Geist Mono', monospace;
  font-size: 11px;
  color: #bbb;
  margin: 0;
}

/* ── Filters ── */
.catalog__filters {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.filter-pill {
  font-family: 'Geist', sans-serif;
  font-size: 12px;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid #e5e5e5;
  background: #fff;
  color: #888;
  cursor: pointer;
  transition: all 0.15s ease;
}

.filter-pill:hover {
  border-color: #111;
  color: #111;
}

.filter-pill--active {
  background: #111;
  border-color: #111;
  color: #fff;
}

/* ── Masonry grid ── */
.explore-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 130px;
  gap: 8px;
}

.explore-card {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  display: flex;
  align-items: flex-end;
  background: #fff;
}

.explore-card:hover {
  border-color: #000;
  box-shadow: 0 0 0 1px #000;
}

.explore-card--tall { grid-row: span 2; }
.explore-card--wide { grid-column: span 2; }

/* ── Background ── */
.explore-card__bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%);
  z-index: 0;
  transition: transform 0.4s ease;
}

.explore-card__bg--image {
  background-size: cover;
  background-position: center;
}

.explore-card:hover .explore-card__bg--image {
  transform: scale(1.04);
}

/* Overlay oscuro sobre imagen para legibilidad */
.explore-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%, transparent 100%);
  z-index: 1;
}

/* ── Content ── */
.explore-card__content {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px;
}

.explore-card__genre {
  font-family: 'Geist Mono', monospace;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #bbb;
}

.explore-card__genre--light {
  color: rgba(255, 255, 255, 0.6);
}

/* ── Reset Book card dentro de explore-card sin imagen ── */
.explore-card :deep(.book-card) {
  border: none;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  padding: 0;
}

.explore-card :deep(.book-card:hover) {
  border: none;
  box-shadow: none;
  background: transparent;
}

.explore-card :deep(.book-card__arrow) {
  display: none;
}

.explore-card :deep(.book-card__thumb) {
  display: none;
}

/* Texto blanco cuando hay imagen de fondo */
.explore-card__overlay ~ .explore-card__content :deep(.book-card__title) {
  color: #fff;
}

.explore-card__overlay ~ .explore-card__content :deep(.book-card__author) {
  color: rgba(255, 255, 255, 0.65);
}

.explore-card__overlay ~ .explore-card__content :deep(.book-card__year) {
  color: rgba(255, 255, 255, 0.45);
}
</style>