<script setup>
import { ref, onMounted } from 'vue';
import { jwtDecode } from "jwt-decode"
import api from '../data/api';
import Book from '../components/Book.vue';
import Nav from "../components/Nav.vue"

const books = ref([])
const email = ref("")

const loadBooks = async()=>{
    const res = await api.get("/books")
    books.value = res.data
    console.log(books.value)
}

const deleteBook = async(id)=>{
    await api.delete("/books/" +id)
    loadBooks()
}

onMounted(()=>{
    loadBooks()
    const token = localStorage.getItem("token")

    if(token){
        const decoded = jwtDecode(token)
        email.value = decoded.email 
    }
})

</script>

<template>
    <main class="dashboard">
        <div class="dashboard__header">
            <div class="dashboard__greeting">
                <span class="dashboard__tag">Library</span>
                <h1 class="dashboard__title">Hello, {{ email }}</h1>
            </div>
        </div>

        <section class="dashboard__section">
            <div class="section__meta">
                <h2 class="section__title">Your Books</h2>
                <span class="section__count">1 book</span>
            </div>
            <div class="books-list">
                <Book v-for="book in books" 
                    :key="book.id" 
                    :author="book.author"
                    :title="book.title"
                    :year="book.year"/>
            </div>
        </section>

        <section class="dashboard-explore">
            <div class="section__meta">
                <h2 class="section__title">Explore</h2>
                <span class="section__count">Trending this week</span>
            </div>

            <div class="explore-grid">
                <!-- Aquí va el v-for con Book cards o cards propias -->
                <div class="explore-card explore-card--tall">
                    <Book :title="'Book1'" :year="2022" :author="'Author'" />
                </div>
                <div class="explore-card">
                    <Book :title="'Book2'" :year="2021" :author="'Author'" />
                </div>
                <div class="explore-card">
                    <Book :title="'Book3'" :year="2020" :author="'Author'" />
                </div>
                <div class="explore-card explore-card--wide">
                    <Book :title="'Book4'" :year="2019" :author="'Author'" />
                </div>
            </div>
        </section>
    </main>
    <Nav />
</template>

<style scoped>
*,
*::before,
*::after {
    box-sizing: border-box;
}

.dashboard {
    min-height: 100vh;
    background: #f9f9f9;
    padding: 64px 48px;
    max-width: 760px;
    margin: 0 auto;
}

/* ── Header ── */
.dashboard__header {
    margin-bottom: 56px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e5e5e5;
}

.dashboard__tag {
    display: inline-block;
    font-family: 'Geist Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #999;
    margin-bottom: 10px;
}

.dashboard__title {
    font-size: 28px;
    font-weight: 600;
    color: #111;
    letter-spacing: -0.03em;
    margin: 0;
    line-height: 1.2;
    font-family: 'Times New Roman', Times, serif !important; 
}

/* ── Section ── */
.dashboard__section {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.section__meta {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
}

.section__title {
    font-size: 13px;
    font-weight: 500;
    color: #111;
    letter-spacing: -0.01em;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-family: 'Geist Mono', monospace;
}

.section__count {
    font-family: 'Geist Mono', monospace;
    font-size: 11px;
    color: #bbb;
}

/* ── Books list ── */
.books-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
}

/* Separa los Book cards internamente sin bordes dobles */
.books-list :deep(.book-card) {
    border: none;
    border-bottom: 1px solid #e5e5e5;
    border-radius: 0;
}

.books-list :deep(.book-card:last-child) {
    border-bottom: none;
}

/* ── Explore ── */
.dashboard-explore {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid #e5e5e5;
}

.explore-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 120px;
  gap: 8px;
}

/* Card base — placeholder visual hasta que carguen datos */
.explore-card {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  display: flex;
  align-items: flex-end;
  padding: 16px;
  position: relative;
  cursor: pointer;
}

.explore-card:hover {
  border-color: #000;
  box-shadow: 0 0 0 1px #000;
}

/* Variantes de tamaño — asignar con v-bind o clase dinámica */
.explore-card--tall {
  grid-row: span 2;
}

.explore-card--wide {
  grid-column: span 2;
}

/* Fondo sutil tipo placeholder / skeleton */
.explore-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #f9f9f9 0%, #f0f0f0 100%);
  z-index: 0;
}

.explore-card > * {
  position: relative;
  z-index: 1;
}

/* Cuando el Book card está dentro del explore-card, lo reseteamos */
.explore-card :deep(.book-card) {
  border: none;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  width: 100%;
  padding: 0;
}

.explore-card :deep(.book-card:hover) {
  border: none;
  box-shadow: none;
  background: transparent;
}
</style>