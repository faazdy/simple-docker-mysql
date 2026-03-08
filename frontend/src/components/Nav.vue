<script setup>
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  // Aquí tu lógica de logout (limpiar token, store, etc.)
  router.push('/login')
}
</script>

<template>
  <header class="glass-header">
    <div class="liquidGlass-wrapper glass-nav">
      <div class="liquidGlass-effect"></div>
      <div class="liquidGlass-tint"></div>
      <div class="liquidGlass-shine"></div>

      <nav class="liquidGlass-text">
        <ul>
          <li>
            <RouterLink to="/books" active-class="nav-link--active">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/catalog" active-class="nav-link--active">Explore</RouterLink>
          </li>
          <li>
            <button class="nav-logout" @click="logout">Log Out</button>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <svg style="display: none">
    <filter id="glass-distortion">
      <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="1" seed="5" />
      <feGaussianBlur stdDeviation="3" result="softMap" />
      <feDisplacementMap in="SourceGraphic" in2="softMap" scale="120" />
    </filter>
  </svg>
</template>

<style scoped>
/* HEADER */
.glass-header {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
}

/* NAV GLASS CONTAINER */
.glass-nav {
    width: 420px;
    height: 64px;
    border-radius: 2.5rem;
    align-items: center;
    justify-content: center;
}

/* LIQUID GLASS CORE */
.liquidGlass-wrapper {
    position: relative;
    display: flex;
    overflow: hidden;
    box-shadow:
        0 8px 20px rgba(0, 0, 0, .25),
        inset 0 1px 0 rgba(255, 255, 255, .5);
}

/* GLASS DISTORTION */
.liquidGlass-effect {
    position: absolute;
    inset: 0;
    backdrop-filter: blur(12px) saturate(160%);
    filter: url(#glass-distortion);
    z-index: 0;
}

/* TINT */
.liquidGlass-tint {
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, .55);
    z-index: 1;
}

/* SHINE */
.liquidGlass-shine {
    position: absolute;
    inset: 0;
    z-index: 2;
    box-shadow:
        inset 1px 1px 1px rgba(255, 255, 255, .7),
        inset -1px -1px 1px rgba(255, 255, 255, .4);
}

/* NAV CONTENT */
.liquidGlass-text {
    position: relative;
    z-index: 3;
}

/* NAV */
nav ul {
    display: flex;
    gap: 32px;
    list-style: none;
    padding: 0;
    margin: 0;
}

nav a {
    font-size: 1rem;
    font-weight: 600;
    color: #111;
    text-decoration: none;
    padding: 8px 14px;
    border-radius: 999px;
    transition: all .3s ease;
}

nav a:hover {
    background: rgba(255, 255, 255, .6);
    backdrop-filter: blur(8px);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .7);
}
</style>