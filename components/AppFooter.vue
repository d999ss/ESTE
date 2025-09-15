<template>
  <footer class="footer">
    <div class="container">
      <div v-if="siteSettings">
        <div class="footer-content">
          <div class="footer-section">
            <h3>{{ siteSettings.siteTitle }}</h3>
            <p>Brand development & design practice</p>
          </div>

          <div class="footer-section">
            <h4>Contact</h4>
            <p v-if="siteSettings.contact?.email">
              <a :href="`mailto:${siteSettings.contact.email}`">
                {{ siteSettings.contact.email }}
              </a>
            </p>
          </div>

          <div class="footer-section">
            <h4>Follow</h4>
            <ul v-if="siteSettings.socialLinks" class="social-links">
              <li v-for="link in siteSettings.socialLinks" :key="link.title">
                <a :href="link.url" target="_blank" rel="noopener">
                  {{ link.title }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; {{ new Date().getFullYear() }} {{ siteSettings.siteTitle }}. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { getSiteSettings } = useSanity()
const { data: siteSettings } = await useAsyncData('siteSettings', getSiteSettings)
</script>

<style scoped>
.footer {
  border-top: 1px solid #eee;
  padding: 40px 0 20px;
  margin-top: 80px;
  color: #666;
  font-size: 12px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
}

.footer-section h3,
.footer-section h4 {
  color: #000;
  margin-bottom: 10px;
  font-size: 14px;
}

.footer-section h3 {
  font-size: 16px;
}

.social-links {
  list-style: none;
  display: flex;
  gap: 15px;
}

.social-links a {
  transition: opacity 0.2s ease;
}

.social-links a:hover {
  opacity: 0.6;
}

.footer-bottom {
  border-top: 1px solid #eee;
  padding-top: 20px;
  text-align: center;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .social-links {
    flex-direction: column;
    gap: 10px;
  }
}
</style>