<template>
  <div class="container">
    <h1 class="page-title font-monument">Work</h1>

    <div v-if="pending" class="loading">
      Loading projects...
    </div>

    <div v-else-if="error" class="error">
      Error loading projects: {{ error }}
    </div>

    <div v-else-if="sortedProjects && sortedProjects.length > 0" class="projects-container">
      <div class="projects-grid">
        <ProjectCard
          v-for="project in sortedProjects"
          :key="project._id"
          :project="project"
        />
      </div>
    </div>

    <div v-else class="empty">
      No projects found.
    </div>
  </div>
</template>

<script setup>
const { getProjects } = useSanity()
const { data: projects, pending, error } = useLazyAsyncData('projects', getProjects)

// Sort projects by order field for authentic layout
const sortedProjects = computed(() => {
  if (!projects.value) return []
  return [...projects.value].sort((a, b) => (a.order || 999) - (b.order || 999))
})

useSeoMeta({
  title: 'EST+6 — Work',
  ogTitle: 'EST+6 — Work',
  description: 'EST+6 is a brand development & design practice delivering authentic world-class work, blending creativity, strategy, and bespoke processes.',
  ogDescription: 'EST+6 is a brand development & design practice delivering authentic world-class work, blending creativity, strategy, and bespoke processes.',
})
</script>

<style scoped>
.page-title {
  font-family: var(--font-monument);
  font-size: var(--text-3xl);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: var(--space-12);
  text-align: center;
}

.projects-container {
  width: 100%;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  gap: var(--grid-gap);
  grid-auto-rows: minmax(200px, auto);
  grid-auto-flow: row dense;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: var(--space-20);
  font-size: var(--text-lg);
  color: var(--color-gray-500);
}

.error {
  color: var(--color-black);
}

/* Responsive grid adjustments */
@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(180px, auto);
  }

  .page-title {
    font-size: var(--text-2xl);
    margin-bottom: var(--space-10);
  }
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--grid-gap);
    grid-auto-rows: minmax(160px, auto);
  }

  .page-title {
    font-size: var(--text-2xl);
    margin-bottom: var(--space-8);
  }
}

@media (max-width: 480px) {
  .projects-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: minmax(200px, auto);
  }

  .page-title {
    font-size: var(--text-xl);
    margin-bottom: var(--space-6);
  }
}
</style>