<script setup>
import { ref, onMounted } from 'vue';
import { jwtDecode } from "jwt-decode"
import api from '../data/api';
import Book from '../components/Book.vue';
import Nav from "../components/Nav.vue"
import "../styles/dashboard.css"
import AddBooksForm from '../components/AddBooksForm.vue';

const books = ref([])
const catalogBooks = ref([])
const email = ref("")

//component AddBooksForm
const addBookModal = ref(null)
//component Book
const handleRemoveBook = ref(null)

const loadBooks = async () => {
    const res = await api.get("/books")
    books.value = res.data
    console.log(books.value)
}

const loadCatalogBooks = async () => {
    const res = await api.get("/books/allbooks")
    catalogBooks.value = res.data.slice(0, 5)
    console.log(catalogBooks.value)
}

const deleteBook = async (id) => {
    await api.delete("/books/" + id)
    console.log('Libro eliminado: ', id)
    loadBooks()
}

onMounted(() => {
    loadBooks()
    loadCatalogBooks()
    const token = localStorage.getItem("token")

    if (token) {
        const decoded = jwtDecode(token)
        email.value = decoded.email
    }
})

</script>

<template>
    <main class="dashboard">
        <div class="dashboard__header">
            <div class="dashboard__greeting">
                <span class="dashboard__tag">Library Buukz</span>
                <h1 class="dashboard__title">Hello, {{ email }}</h1>
            </div>
        </div>

        <section class="dashboard__section">
            <div class="section__meta">
                <h2 class="section__title">Your Books</h2>
                <span class="section__count">{{ books.length > 1 ? `${books.length} Books` : `${books.length} Book`}}</span>
            </div>
            <div class="btns-actions">
                <button class="btn primary" @click="addBookModal.handleModal()">Add book</button>
                <button class="btn secundary">Books Shop</button>
            </div>
            <div class="books-list">
                <Book v-for="book in books" 
                    :key="book.id" 
                    :author="book.author" 
                    :title="book.title"
                    :year="book.year"
                    @delete-book="deleteBook(book.id)"
                    />
            </div>
        </section>

        <section class="dashboard-explore">
            <div class="section__meta">
                <h2 class="section__title">Explore</h2>
                <span class="section__count">Trending this week</span>
            </div>

            <div class="explore-grid">
                <div v-for="(newBook, i) in catalogBooks" :key="newBook.id" class="explore-card"
                    :class="i % 5 === 0 ? 'explore-card--tall' : i % 5 === 3 ? 'explore-card--wide' : ''">
                    <div class="explore-card__bg"
                        :style="newBook.image ? `background-image: url(${newBook.image})` : ''"
                        :class="{ 'explore-card__bg--image': newBook.image }" />
                    <div v-if="newBook.image" class="explore-card__overlay" />

                    <div class="explore-card__content">
                        <span class="explore-card__genre">{{ newBook.genre }}</span>
                        <p class="explore-card__title">{{ newBook.title }}</p>
                        <span class="explore-card__author">{{ newBook.author }}</span>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <AddBooksForm ref="addBookModal" @book-added="loadBooks()" />
    <Nav />
</template>

<style scoped>
*,
*::before,
*::after {
    box-sizing: border-box;
}
</style>