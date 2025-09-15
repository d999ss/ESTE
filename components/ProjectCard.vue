<template>
  <article class="project-card">
    <NuxtLink :to="`/project/${project.slug.current}`" class="project-link">
      <div class="project-image-container">
        <img
          v-if="project.images && project.images[0]"
          :src="urlFor(project.images[0]).width(600).height(400).url()"
          :alt="project.title"
          class="project-image"
        />
        <div v-else class="project-image-placeholder">
          No image
        </div>
      </div>

      <div class="project-info">
        <h2 class="project-title">{{ project.title }}</h2>
        <p class="project-client">{{ project.client }} — {{ project.year }}</p>

        <div class="project-meta">
          <span v-if="project.nature" class="project-nature">
            {{ project.nature.code }}
          </span>
          <span v-if="project.locations && project.locations.length > 0" class="project-location">
            {{ project.locations.map(l => l.title).join(', ') }}
          </span>
        </div>

        <div v-if="project.capabilities && project.capabilities.length > 0" class="project-capabilities">
          <span
            v-for="capability in project.capabilities"
            :key="capability.slug.current"
            class="capability-tag"
          >
            {{ capability.code }}
          </span>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const { urlFor } = useSanity()
</script>

<style scoped>
.project-card {
  border: 1px solid #eee;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.project-link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.project-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 3/2;
  overflow: hidden;
  background: #f5f5f5;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image {
  transform: scale(1.02);
}

.project-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
}

.project-info {
  padding: 20px;
}

.project-title {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 16px;
}

.project-client {
  color: #666;
  font-size: 12px;
  margin-bottom: 15px;
}

.project-meta {
  display: flex;
  gap: 10px;
  font-size: 11px;
  color: #999;
  margin-bottom: 15px;
}

.project-capabilities {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.capability-tag {
  background: #f0f0f0;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  color: #666;
}

@media (max-width: 768px) {
  .project-info {
    padding: 15px;
  }

  .project-title {
    font-size: 14px;
  }

  .project-capabilities {
    gap: 6px;
  }

  .capability-tag {
    font-size: 9px;
    padding: 3px 6px;
  }
}
</style>