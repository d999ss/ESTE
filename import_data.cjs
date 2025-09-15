#!/usr/bin/env node

const {createClient} = require('@sanity/client')
const fs = require('fs')

// Initialize Sanity client for the new project
const client = createClient({
  projectId: '928u0duj', // Your new project
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_WRITE_TOKEN, // You'll need to set this
})

async function importData() {
  console.log('🚀 Starting EST+6 data import...')

  // First, create reference data
  console.log('📝 Creating capabilities...')
  const capabilities = await createCapabilities()

  console.log('📍 Creating locations...')
  const locations = await createLocations()

  console.log('🏷️ Creating natures...')
  const natures = await createNatures()

  console.log('⚙️ Creating site settings...')
  await createSiteSettings()

  console.log('🎨 Creating sample projects...')
  await createSampleProjects(capabilities, locations, natures)

  console.log('✅ Import complete!')
}

async function createCapabilities() {
  const capabilities = [
    { title: 'Brand platforms', code: 'BP', slug: 'brand-platforms' },
    { title: 'Brand strategy', code: 'BS', slug: 'brand-strategy' },
    { title: 'Motion Design', code: 'MD', slug: 'motion-design' },
    { title: 'Art Direction', code: 'AD', slug: 'art-direction' },
    { title: 'Brand Identity', code: 'B.ID', slug: 'brand-identity' },
    { title: 'Packaging design', code: 'PD', slug: 'packaging-design' },
    { title: 'Interactive design', code: 'ID', slug: 'interactive-design' },
    { title: 'Brand Systems', code: 'BDS', slug: 'brand-systems' },
  ]

  const results = []
  for (const cap of capabilities) {
    try {
      const result = await client.create({
        _type: 'capability',
        _id: `capability-${cap.slug}`,
        title: cap.title,
        code: cap.code,
        slug: { current: cap.slug },
      })
      results.push(result)
      console.log(`  ✅ Created capability: ${cap.title}`)
    } catch (error) {
      console.log(`  ⚠️ Capability ${cap.title} may already exist`)
    }
  }
  return results
}

async function createLocations() {
  const locations = [
    { title: 'New York, NY', slug: 'new-york-ny' },
    { title: 'Barcelona', slug: 'barcelona' },
    { title: 'Oakland, CA', slug: 'oakland-ca' },
    { title: 'LOS ANGELES, CA', slug: 'los-angeles-ca' },
  ]

  const results = []
  for (const loc of locations) {
    try {
      const result = await client.create({
        _type: 'location',
        _id: `location-${loc.slug}`,
        title: loc.title,
        slug: { current: loc.slug },
      })
      results.push(result)
      console.log(`  ✅ Created location: ${loc.title}`)
    } catch (error) {
      console.log(`  ⚠️ Location ${loc.title} may already exist`)
    }
  }
  return results
}

async function createNatures() {
  const natures = [
    { title: 'Commercial', code: 'Co', slug: 'commercial' },
    { title: 'Pro Bono', code: 'PB', slug: 'pro-bono' },
    { title: 'Passion Project', code: 'PP', slug: 'passion-project' },
  ]

  const results = []
  for (const nature of natures) {
    try {
      const result = await client.create({
        _type: 'nature',
        _id: `nature-${nature.slug}`,
        title: nature.title,
        code: nature.code,
        slug: { current: nature.slug },
      })
      results.push(result)
      console.log(`  ✅ Created nature: ${nature.title}`)
    } catch (error) {
      console.log(`  ⚠️ Nature ${nature.title} may already exist`)
    }
  }
  return results
}

async function createSiteSettings() {
  try {
    await client.create({
      _type: 'siteSettings',
      _id: 'site-settings',
      siteTitle: 'EST+6',
      siteUrl: 'https://estplus6.vercel.app/',
      siteLanguage: 'en',
      contact: {
        email: 'hi@estplus6.com',
      },
      socialLinks: [
        { title: 'LinkedIn', url: 'https://www.linkedin.com/company/estplus6/' },
        { title: 'IG', url: 'https://www.instagram.com/estplus6/' },
      ],
      seo: {
        ogdescription: 'EST+6 is a brand development & design practice delivering authentic world-class work, blending creativity, strategy, and bespoke processes.',
        ogtitle: 'EST+6 — New York + Barcelona',
      },
    })
    console.log('  ✅ Created site settings')
  } catch (error) {
    console.log('  ⚠️ Site settings may already exist')
  }
}

async function createSampleProjects(capabilities, locations, natures) {
  const projects = [
    {
      title: 'Brand Platform Relaunch',
      client: 'VSCO',
      year: '2023',
      slug: 'vsco-brand-platform-relaunch',
      order: 1,
      capabilities: ['brand-platforms', 'brand-strategy'],
      locations: ['oakland-ca'],
      nature: 'commercial',
    },
    {
      title: 'Perfume Packaging Design',
      client: 'AYOND',
      year: '2023',
      slug: 'ayond-perfume-packaging-design',
      order: 2,
      capabilities: ['packaging-design', 'brand-strategy'],
      locations: ['new-york-ny'],
      nature: 'commercial',
    },
  ]

  for (const project of projects) {
    try {
      await client.create({
        _type: 'project',
        _id: `project-${project.slug}`,
        title: project.title,
        client: project.client,
        year: project.year,
        slug: { current: project.slug },
        order: project.order,
        status: {
          isPublic: true,
          statusText: 'New project',
        },
        capabilities: project.capabilities.map(slug => ({
          _type: 'reference',
          _ref: `capability-${slug}`,
        })),
        locations: project.locations.map(slug => ({
          _type: 'reference',
          _ref: `location-${slug}`,
        })),
        nature: {
          _type: 'reference',
          _ref: `nature-${project.nature}`,
        },
        thumbnail: {
          format: 'horizontal',
          size: 'large',
        },
      })
      console.log(`  ✅ Created project: ${project.client} - ${project.title}`)
    } catch (error) {
      console.log(`  ⚠️ Project ${project.title} may already exist`)
    }
  }
}

// Run the import
if (require.main === module) {
  importData().catch(console.error)
}

module.exports = { importData }