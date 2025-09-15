<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <NuxtLink to="/" class="logo">EST+6</NuxtLink>
        <ul class="nav-links">
          <li><NuxtLink to="/">Work</NuxtLink></li>
          <li><NuxtLink to="/about">About</NuxtLink></li>
          <li><NuxtLink to="/contact">Contact</NuxtLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 100;
  border-bottom: 1px solid #eee;
  padding: 20px 0;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-weight: bold;
  font-size: 16px;
}

.nav-links {
  display: flex;
  gap: 30px;
  list-style: none;
}

.nav-links a {
  transition: opacity 0.2s ease;
}

.nav-links a:hover {
  opacity: 0.6;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
</style>