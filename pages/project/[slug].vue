<template>
  <div class="container">
    <div v-if="pending" class="loading">
      Loading project...
    </div>

    <div v-else-if="error" class="error">
      Error loading project: {{ error }}
    </div>

    <div v-else-if="project" class="project-detail">
      <header class="project-header">
        <h1 class="project-title">{{ project.title }}</h1>
        <div class="project-meta">
          <span class="project-client">{{ project.client }}</span>
          <span class="project-year">{{ project.year }}</span>
          <span v-if="project.nature" class="project-nature">{{ project.nature.title }}</span>
        </div>

        <div v-if="project.capabilities && project.capabilities.length > 0" class="project-capabilities">
          <span
            v-for="capability in project.capabilities"
            :key="capability.slug.current"
            class="capability-tag"
          >
            {{ capability.title }}
          </span>
        </div>

        <div v-if="project.locations && project.locations.length > 0" class="project-locations">
          <span class="locations-label">Location:</span>
          <span class="locations-list">
            {{ project.locations.map(l => l.title).join(', ') }}
          </span>
        </div>
      </header>

      <div v-if="project.description" class="project-description">
        {{ project.description }}
      </div>

      <div v-if="project.images && project.images.length > 0" class="project-gallery">
        <div
          v-for="(image, index) in project.images"
          :key="index"
          class="gallery-item"
        >
          <img
            :src="urlFor(image).width(1200).url()"
            :alt="`${project.title} - Image ${index + 1}`"
            class="gallery-image"
          />
        </div>
      </div>

      <div v-if="project.videos && project.videos.length > 0" class="project-videos">
        <div
          v-for="(video, index) in project.videos"
          :key="index"
          class="video-item"
        >
          <div v-if="video.vimeoId" class="video-container">
            <iframe
              :src="`https://player.vimeo.com/video/${video.vimeoId}?autoplay=0&loop=0&muted=0`"
              frameborder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowfullscreen
              class="video-iframe"
            ></iframe>
          </div>
        </div>
      </div>

      <div class="project-navigation">
        <NuxtLink to="/" class="back-link">← Back to Work</NuxtLink>
      </div>
    </div>

    <div v-else class="not-found">
      Project not found.
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { getProject } = useSanity()
const { urlFor } = useSanity()

const { data: project, pending, error } = await useAsyncData(
  `project-${route.params.slug}`,
  () => getProject(route.params.slug)
)

useSeoMeta({
  title: computed(() => project.value ? `${project.value.title} — EST+6` : 'Project — EST+6'),
  ogTitle: computed(() => project.value ? `${project.value.title} — EST+6` : 'Project — EST+6'),
  description: computed(() => project.value?.description || 'EST+6 project showcase'),
  ogDescription: computed(() => project.value?.description || 'EST+6 project showcase'),
})
</script>

<style scoped>
.project-detail {
  max-width: 800px;
  margin: 0 auto;
}

.project-header {
  text-align: center;
  margin-bottom: 60px;
}

.project-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}

.project-meta {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  color: #666;
  font-size: 14px;
}

.project-capabilities {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.capability-tag {
  background: #f0f0f0;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  color: #666;
}

.project-locations {
  color: #999;
  font-size: 12px;
}

.locations-label {
  font-weight: 500;
}

.project-description {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 60px;
  text-align: center;
}

.project-gallery {
  margin-bottom: 60px;
}

.gallery-item {
  margin-bottom: 40px;
}

.gallery-image {
  width: 100%;
  height: auto;
  display: block;
}

.project-videos {
  margin-bottom: 60px;
}

.video-item {
  margin-bottom: 40px;
}

.video-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
}

.video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.project-navigation {
  text-align: center;
  padding: 40px 0;
}

.back-link {
  color: #666;
  font-size: 14px;
  transition: opacity 0.2s ease;
}

.back-link:hover {
  opacity: 0.6;
}

.loading,
.error,
.not-found {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.error {
  color: #d00;
}

@media (max-width: 768px) {
  .project-title {
    font-size: 24px;
  }

  .project-meta {
    flex-direction: column;
    gap: 10px;
  }

  .project-capabilities {
    gap: 8px;
  }

  .capability-tag {
    font-size: 11px;
    padding: 4px 8px;
  }

  .gallery-item {
    margin-bottom: 30px;
  }

  .video-item {
    margin-bottom: 30px;
  }
}
</style>