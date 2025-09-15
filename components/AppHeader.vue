<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <div class="nav-left">
          <NuxtLink to="/" class="logo">EST+6</NuxtLink>
          <div class="location-indicators">
            <span class="location-indicator" :class="{ active: currentLocation === 'NYC' }">NYC</span>
            <span class="location-indicator" :class="{ active: currentLocation === 'EST' }">EST</span>
            <span class="location-indicator" :class="{ active: currentLocation === 'BCN' }">BCN</span>
          </div>
        </div>

        <ul class="nav-links">
          <li><NuxtLink to="/" class="nav-link">Work</NuxtLink></li>
          <li><NuxtLink to="/about" class="nav-link">About</NuxtLink></li>
          <li><NuxtLink to="/contact" class="nav-link">Contact</NuxtLink></li>
        </ul>

        <!-- Mobile menu button -->
        <button
          class="mobile-menu-button"
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Toggle menu"
        >
          <span class="menu-line" :class="{ active: mobileMenuOpen }"></span>
          <span class="menu-line" :class="{ active: mobileMenuOpen }"></span>
        </button>
      </nav>

      <!-- Mobile menu -->
      <div class="mobile-menu" :class="{ active: mobileMenuOpen }">
        <ul class="mobile-nav-links">
          <li><NuxtLink to="/" class="mobile-nav-link" @click="mobileMenuOpen = false">Work</NuxtLink></li>
          <li><NuxtLink to="/about" class="mobile-nav-link" @click="mobileMenuOpen = false">About</NuxtLink></li>
          <li><NuxtLink to="/contact" class="mobile-nav-link" @click="mobileMenuOpen = false">Contact</NuxtLink></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const mobileMenuOpen = ref(false)
const currentLocation = ref('EST')

// Simulate location changes based on time (EST+6 signature feature)
const updateLocation = () => {
  const hour = new Date().getHours()
  if (hour >= 9 && hour < 17) {
    currentLocation.value = 'NYC'
  } else if (hour >= 15 && hour < 23) {
    currentLocation.value = 'BCN'
  } else {
    currentLocation.value = 'EST'
  }
}

onMounted(() => {
  updateLocation()
  const interval = setInterval(updateLocation, 60000) // Update every minute

  onUnmounted(() => {
    clearInterval(interval)
  })
})

// Close mobile menu when clicking outside
const closeMobileMenu = (e) => {
  if (!e.target.closest('.mobile-menu') && !e.target.closest('.mobile-menu-button')) {
    mobileMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeMobileMenu)

  onUnmounted(() => {
    document.removeEventListener('click', closeMobileMenu)
  })
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--color-white);
  z-index: 1000;
  border-bottom: 1px solid var(--color-gray-200);
  padding: var(--space-5) 0;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: var(--space-6);
}

.logo {
  font-family: var(--font-monument);
  font-size: var(--text-base);
  font-weight: 700;
  letter-spacing: -0.02em;
  transition: opacity var(--transition);
}

.logo:hover {
  opacity: 0.7;
}

.location-indicators {
  display: flex;
  gap: var(--space-3);
  font-size: var(--text-2xs);
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.location-indicator {
  opacity: 0.3;
  transition: opacity var(--transition);
  cursor: default;
}

.location-indicator.active {
  opacity: 1;
}

.nav-links {
  display: flex;
  gap: var(--space-8);
  list-style: none;
  font-size: var(--text-sm);
  font-weight: 400;
}

.nav-link {
  transition: opacity var(--transition);
  position: relative;
}

.nav-link:hover {
  opacity: 0.6;
}

.nav-link.router-link-active {
  opacity: 0.6;
}

/* Mobile menu button */
.mobile-menu-button {
  display: none;
  flex-direction: column;
  gap: 3px;
  padding: var(--space-2);
  cursor: pointer;
}

.menu-line {
  width: 18px;
  height: 1px;
  background: var(--color-black);
  transition: all var(--transition);
  transform-origin: center;
}

.menu-line.active:first-child {
  transform: rotate(45deg) translate(2px, 2px);
}

.menu-line.active:last-child {
  transform: rotate(-45deg) translate(2px, -2px);
}

/* Mobile menu */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--color-white);
  border-bottom: 1px solid var(--color-gray-200);
  opacity: 0;
  transform: translateY(-10px);
  visibility: hidden;
  transition: all var(--transition);
}

.mobile-menu.active {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
}

.mobile-nav-links {
  list-style: none;
  padding: var(--space-6) 0;
}

.mobile-nav-link {
  display: block;
  padding: var(--space-4) 0;
  font-size: var(--text-base);
  font-weight: 400;
  transition: opacity var(--transition);
}

.mobile-nav-link:hover {
  opacity: 0.6;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .mobile-menu-button {
    display: flex;
  }

  .location-indicators {
    display: none;
  }

  .nav-left {
    gap: var(--space-4);
  }
}

@media (max-width: 480px) {
  .header {
    padding: var(--space-4) 0;
  }

  .nav-left {
    gap: var(--space-3);
  }

  .logo {
    font-size: var(--text-sm);
  }
}
</style>