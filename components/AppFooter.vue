<template>
  <footer class="footer">
    <div class="container">
      <div v-if="siteSettings" class="footer-content">
        <div class="footer-main">
          <div class="footer-brand">
            <h3 class="footer-title font-monument">{{ siteSettings.siteTitle }}</h3>
            <p class="footer-tagline">New York + Barcelona</p>
          </div>

          <div class="footer-contact">
            <p v-if="siteSettings.contact?.email" class="contact-email">
              <a :href="`mailto:${siteSettings.contact.email}`">
                {{ siteSettings.contact.email }}
              </a>
            </p>
          </div>

          <div class="footer-social">
            <ul v-if="siteSettings.socialLinks" class="social-links">
              <li v-for="link in siteSettings.socialLinks" :key="link.title">
                <a :href="link.url" target="_blank" rel="noopener" class="social-link">
                  {{ link.title }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p class="copyright">© {{ new Date().getFullYear() }}</p>
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
  margin-top: var(--space-20);
  padding: var(--space-20) 0 var(--space-8);
  border-top: 1px solid var(--color-gray-200);
}

.footer-content {
  width: 100%;
}

.footer-main {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  gap: var(--grid-gap);
  margin-bottom: var(--space-12);
}

.footer-brand {
  grid-column: span 2;
}

.footer-title {
  font-family: var(--font-monument);
  font-size: var(--text-lg);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-black);
  margin-bottom: var(--space-1);
}

.footer-tagline {
  font-size: var(--text-sm);
  color: var(--color-gray-600);
  font-weight: 400;
}

.footer-contact {
  grid-column: span 2;
  display: flex;
  align-items: flex-start;
}

.contact-email {
  font-size: var(--text-sm);
  color: var(--color-black);
}

.contact-email a {
  transition: opacity var(--transition);
}

.contact-email a:hover {
  opacity: 0.6;
}

.footer-social {
  grid-column: span 2;
  display: flex;
  align-items: flex-start;
}

.social-links {
  list-style: none;
  display: flex;
  gap: var(--space-6);
}

.social-link {
  font-size: var(--text-sm);
  color: var(--color-black);
  transition: opacity var(--transition);
}

.social-link:hover {
  opacity: 0.6;
}

.footer-bottom {
  border-top: 1px solid var(--color-gray-200);
  padding-top: var(--space-6);
}

.copyright {
  font-size: var(--text-xs);
  color: var(--color-gray-600);
  text-align: center;
}

/* Responsive */
@media (max-width: 768px) {
  .footer-main {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }

  .footer-brand,
  .footer-contact,
  .footer-social {
    grid-column: span 1;
  }

  .social-links {
    gap: var(--space-4);
  }

  .footer {
    margin-top: var(--space-16);
    padding: var(--space-16) 0 var(--space-6);
  }
}

@media (max-width: 480px) {
  .social-links {
    flex-direction: column;
    gap: var(--space-3);
  }

  .footer {
    margin-top: var(--space-12);
    padding: var(--space-12) 0 var(--space-4);
  }
}
</style>