import { createClient } from '@sanity/client'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const client = createClient({
    projectId: config.public.sanityProjectId,
    dataset: config.public.sanityDataset,
    apiVersion: config.public.sanityApiVersion,
    useCdn: true,
  })

  return {
    provide: {
      sanity: client
    }
  }
})