<template>
  <div class="container">
    <h1 class="page-title">Work</h1>

    <div v-if="pending" class="loading">
      Loading projects...
    </div>

    <div v-else-if="error" class="error">
      Error loading projects: {{ error }}
    </div>

    <div v-else-if="projects && projects.length > 0" class="projects-grid">
      <ProjectCard
        v-for="project in projects"
        :key="project._id"
        :project="project"
      />
    </div>

    <div v-else class="empty">
      No projects found.
    </div>
  </div>
</template>

<script setup>
const { getProjects } = useSanity()
const { data: projects, pending, error } = await useAsyncData('projects', getProjects)

useSeoMeta({
  title: 'EST+6 — Work',
  ogTitle: 'EST+6 — Work',
  description: 'EST+6 is a brand development & design practice delivering authentic world-class work, blending creativity, strategy, and bespoke processes.',
  ogDescription: 'EST+6 is a brand development & design practice delivering authentic world-class work, blending creativity, strategy, and bespoke processes.',
})
</script>

<style scoped>
.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: center;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 40px;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.error {
  color: #d00;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .page-title {
    font-size: 20px;
    margin-bottom: 30px;
  }
}
</style>