import imageUrlBuilder from '@sanity/image-url'

export const useSanity = () => {
  const { $sanity } = useNuxtApp()

  const builder = imageUrlBuilder($sanity)

  const urlFor = (source: any) => {
    return builder.image(source)
  }

  const getProjects = async () => {
    const query = `*[_type == "project"] | order(order asc) {
      _id,
      title,
      client,
      year,
      slug,
      order,
      status,
      capabilities[]->{
        title,
        code,
        slug
      },
      locations[]->{
        title,
        slug
      },
      nature->{
        title,
        code,
        slug
      },
      thumbnail,
      images,
      videos,
      description,
      seo
    }`
    return await $sanity.fetch(query)
  }

  const getProject = async (slug: string) => {
    const query = `*[_type == "project" && slug.current == $slug][0]{
      _id,
      title,
      client,
      year,
      slug,
      order,
      status,
      capabilities[]->{
        title,
        code,
        slug
      },
      locations[]->{
        title,
        slug
      },
      nature->{
        title,
        code,
        slug
      },
      thumbnail,
      images,
      videos,
      description,
      seo
    }`
    return await $sanity.fetch(query, { slug })
  }

  const getSiteSettings = async () => {
    const query = `*[_type == "siteSettings"][0]{
      siteTitle,
      siteUrl,
      siteLanguage,
      siteFavicon,
      contact,
      socialLinks,
      seo,
      credits
    }`
    return await $sanity.fetch(query)
  }

  return {
    urlFor,
    getProjects,
    getProject,
    getSiteSettings
  }
}