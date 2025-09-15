<template>
  <article
    class="project-card"
    :class="[
      `size-${thumbnailSize}`,
      `format-${thumbnailFormat}`
    ]"
  >
    <NuxtLink :to="`/project/${project.slug.current}`" class="project-link">
      <div class="project-image-container">
        <img
          v-if="thumbnailImage"
          :src="urlFor(thumbnailImage).width(imageWidth).height(imageHeight).url()"
          :alt="project.title"
          class="project-image"
          loading="lazy"
        />
        <div v-else class="project-image-placeholder">
          <span class="placeholder-text">{{ project.client }}</span>
        </div>

        <!-- EST+6 signature hover overlay -->
        <div class="project-overlay">
          <div class="project-info">
            <h2 class="project-title">{{ project.title }}</h2>
            <p class="project-client">{{ project.client }}</p>
            <p class="project-year">{{ project.year }}</p>

            <div class="project-meta">
              <span v-if="project.nature" class="project-nature">
                {{ project.nature.title }}
              </span>
              <span v-if="project.locations && project.locations.length > 0" class="project-location">
                {{ project.locations.map(l => l.title).join(' + ') }}
              </span>
            </div>

            <div v-if="project.capabilities && project.capabilities.length > 0" class="project-capabilities">
              <span
                v-for="capability in project.capabilities.slice(0, 6)"
                :key="capability._ref || capability.slug?.current"
                class="capability-code"
              >
                {{ getCapabilityCode(capability) }}
              </span>
              <span v-if="project.capabilities.length > 6" class="capability-more">
                +{{ project.capabilities.length - 6 }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const { urlFor } = useSanity()

// Extract thumbnail format and size from original data structure
const thumbnailFormat = computed(() => {
  return props.project.thumbnail?.format || 'horizontal'
})

const thumbnailSize = computed(() => {
  return props.project.thumbnail?.size || 'medium'
})

// Get the appropriate thumbnail image
const thumbnailImage = computed(() => {
  // Use featuredImage if available, otherwise fall back to first image
  if (props.project.featuredImage) {
    return props.project.featuredImage
  }
  if (props.project.images && props.project.images.length > 0) {
    return props.project.images[0]
  }
  return null
})

// Calculate image dimensions based on format and size
const imageWidth = computed(() => {
  const sizeMultiplier = thumbnailSize.value === 'large' ? 1.5 :
                        thumbnailSize.value === 'small' ? 0.8 : 1

  switch (thumbnailFormat.value) {
    case 'square': return Math.round(400 * sizeMultiplier)
    case 'vertical': return Math.round(300 * sizeMultiplier)
    case 'horizontal':
    default: return Math.round(600 * sizeMultiplier)
  }
})

const imageHeight = computed(() => {
  const sizeMultiplier = thumbnailSize.value === 'large' ? 1.5 :
                        thumbnailSize.value === 'small' ? 0.8 : 1

  switch (thumbnailFormat.value) {
    case 'square': return Math.round(400 * sizeMultiplier)
    case 'vertical': return Math.round(400 * sizeMultiplier)
    case 'horizontal':
    default: return Math.round(338 * sizeMultiplier)
  }
})

// Helper to get capability code from reference or object
const getCapabilityCode = (capability) => {
  if (typeof capability === 'string') return capability
  if (capability.code) return capability.code
  if (capability.title) return capability.title.substring(0, 3).toUpperCase()
  return 'CAP'
}
</script>

<style scoped>
.project-card {
  display: block;
  position: relative;
  overflow: hidden;
  background: var(--color-black);
  transition: transform var(--transition);
  border-radius: 0;
}

.project-card:hover {
  transform: scale(0.98);
}

/* Size variations - EST+6 signature */
.project-card.size-small {
  grid-row: span 1;
}

.project-card.size-medium {
  grid-row: span 2;
}

.project-card.size-large {
  grid-row: span 3;
}

/* Format variations */
.project-card.format-square {
  aspect-ratio: 1;
}

.project-card.format-horizontal {
  aspect-ratio: 16/9;
}

.project-card.format-vertical {
  aspect-ratio: 3/4;
}

.project-card.format-verticalXL {
  aspect-ratio: 3/5;
}

.project-link {
  display: block;
  color: inherit;
  text-decoration: none;
  width: 100%;
  height: 100%;
}

.project-image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition);
  display: block;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.project-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gray-800);
  color: var(--color-white);
}

.placeholder-text {
  font-family: var(--font-monument);
  font-size: var(--text-lg);
  font-weight: 700;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  opacity: 0.5;
}

/* EST+6 signature overlay */
.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 40%,
    rgba(0, 0, 0, 0) 70%
  );
  opacity: 0;
  transition: opacity var(--transition);
  display: flex;
  align-items: flex-end;
  padding: var(--space-6);
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-info {
  width: 100%;
}

.project-title {
  font-family: var(--font-monument);
  font-size: var(--text-lg);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-white);
  margin-bottom: var(--space-1);
  line-height: 1.2;
}

.project-client {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-white);
  opacity: 0.9;
  margin-bottom: var(--space-1);
}

.project-year {
  font-size: var(--text-xs);
  color: var(--color-white);
  opacity: 0.7;
  margin-bottom: var(--space-3);
}

.project-meta {
  margin-bottom: var(--space-4);
}

.project-nature,
.project-location {
  display: block;
  font-size: var(--text-xs);
  color: var(--color-white);
  opacity: 0.7;
  font-weight: 400;
  line-height: 1.4;
}

.project-capabilities {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.capability-code {
  font-size: var(--text-2xs);
  color: var(--color-white);
  opacity: 0.6;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.capability-more {
  font-size: var(--text-2xs);
  color: var(--color-white);
  opacity: 0.5;
  font-weight: 400;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .project-overlay {
    padding: var(--space-4);
  }

  .project-title {
    font-size: var(--text-base);
  }

  .project-client {
    font-size: var(--text-xs);
  }

  .project-year {
    font-size: var(--text-2xs);
  }

  .project-capabilities {
    gap: var(--space-1);
  }

  /* Show overlay by default on mobile */
  .project-overlay {
    opacity: 1;
  }

  .project-card:hover {
    transform: none;
  }

  .project-card:hover .project-image {
    transform: none;
  }
}

@media (max-width: 480px) {
  .project-overlay {
    padding: var(--space-3);
  }

  .project-title {
    font-size: var(--text-sm);
  }

  .project-meta {
    margin-bottom: var(--space-2);
  }
}
</style>