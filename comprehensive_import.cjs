#!/usr/bin/env node

const {createClient} = require('@sanity/client')
const fs = require('fs')

// Initialize Sanity client for the new project
const client = createClient({
  projectId: '928u0duj',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_WRITE_TOKEN,
})

async function createImageAsset(imageUrl) {
  try {
    // For existing Sanity CDN images, we'll create a reference
    if (imageUrl.includes('cdn.sanity.io')) {
      // Extract asset ID from URL
      const urlParts = imageUrl.split('/')
      const filename = urlParts[urlParts.length - 1]
      const assetId = filename.split('-').slice(0, -1).join('-')
      const dimensions = filename.split('-').pop().replace(/\.[^/.]+$/, "")

      return {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: `image-${assetId}-${dimensions}`
        }
      }
    }
  } catch (error) {
    console.log(`  ⚠️ Could not process image: ${imageUrl}`)
    return null
  }
}

async function comprehensiveImport() {
  console.log('🚀 Starting comprehensive EST+6 content import...')

  // Complete project data extracted from the original site
  const projects = [
    {
      title: "Brand Platform Relaunch",
      client: "VSCO",
      year: "2023",
      slug: "vsco-brand-platform-relaunch",
      order: 1,
      description: "Brand and Design Strategy, Brand Identity Redesign, and Brand Implementation for VSCO's new business and audience shift.",
      capabilities: ['brand-platforms', 'brand-strategy', 'design-strategy', 'brand-identity', 'art-direction', 'marketing-design', 'brand-audit', 'brand-guidelines-and-creative-toolkits', 'curation', 'brand-implementation', 'brand-systems'],
      locations: ['oakland-ca'],
      nature: 'commercial',
      images: [
        "https://cdn.sanity.io/images/e8r1mybk/production/19470447762c272a39e2aae871cff8a1e2453114-3342x1880.jpg",
        "https://cdn.sanity.io/images/e8r1mybk/production/b66e1e82d93244730a8ab3469cf66759da53038a-3342x1880.jpg",
        "https://cdn.sanity.io/images/e8r1mybk/production/fdae286eb6fa92246200682f030935d396f1c2c8-3342x1880.jpg",
        "https://cdn.sanity.io/images/e8r1mybk/production/5560c256090c1e18320af9a64fc164bab5653594-3342x1880.jpg",
        "https://cdn.sanity.io/images/e8r1mybk/production/c027cc385e6cca4e8548482f0f30f03a96952dba-3342x1880.jpg"
      ],
      videos: [
        { vimeoId: "918290535" }
      ],
      featuredImage: "https://cdn.sanity.io/images/e8r1mybk/production/2bcd7c43b9e9355e48510a5d75a73fe442bb548f-3342x1880.jpg",
      seo: {
        ogtitle: "Visual Supply Company",
        ogdescription: "Brand and Design Strategy, Brand Identity Redesign, and Brand Implementation for VSCO's new business and audience shift.",
        ogimage: "https://cdn.sanity.io/images/e8r1mybk/production/19470447762c272a39e2aae871cff8a1e2453114-3342x1880.jpg"
      }
    },
    {
      title: "Perfume Packaging Design",
      client: "AYOND",
      year: "2023",
      slug: "ayond-perfume-packaging-design",
      order: 2,
      description: "Packaging design for Ayond's Perfume collections. Introducing the desert line symbolizes the rugged beauty of the desert that celebrates desert resilience.",
      capabilities: ['packaging-design', 'brand-strategy', 'design-strategy', 'brand-systems'],
      locations: ['new-york-ny'],
      nature: 'commercial',
      images: [
        "https://cdn.sanity.io/images/e8r1mybk/production/5459b00bc31c0d893e7b5ec73b7cab8f0bec06ad-2000x1126.jpg"
      ],
      featuredImage: "https://cdn.sanity.io/images/e8r1mybk/production/e3bdfbf5b16042dce2094bdf9df6664e708313a4-701x968.jpg",
      seo: {
        ogtitle: "EST+6 Ayond Perfume Packaging Design",
        ogdescription: "Packaging design for Ayond's Perfume collections. Introducing the desert line symbolizes the rugged beauty of the desert that celebrates desert resilience.",
        ogimage: "https://cdn.sanity.io/images/e8r1mybk/production/5459b00bc31c0d893e7b5ec73b7cab8f0bec06ad-2000x1126.jpg"
      }
    },
    {
      title: "Motion Design",
      client: "VSCO",
      year: "2024",
      slug: "vsco-motion-design",
      order: 3,
      description: "Set of motion principles and to translate them as part of the brand system and VSCO's brand strategy.",
      capabilities: ['motion-design', 'brand-systems', 'design-strategy', 'art-direction'],
      locations: ['oakland-ca', 'barcelona'],
      nature: 'commercial',
      images: [
        "https://cdn.sanity.io/images/e8r1mybk/production/0d55012d161660ffb36b205cb20123173ca7d4ae-3342x1880.jpg",
        "https://cdn.sanity.io/images/e8r1mybk/production/e6685f661c3c28e3878f444f7fa03383b0667939-3342x1880.jpg",
        "https://cdn.sanity.io/images/e8r1mybk/production/bc2ad89e4c93b08a3136affc592ee77d1b001704-3342x1880.jpg",
        "https://cdn.sanity.io/images/e8r1mybk/production/52f568b1f0bf91b0faa1446fd7451ca1eab6b05f-1653x1653.jpg"
      ],
      videos: [
        { vimeoId: "946661075" }
      ],
      featuredImage: "https://cdn.sanity.io/images/e8r1mybk/production/1ab5151155dd60cc953c51e27de0c18121b4b245-1080x1920.jpg",
      seo: {
        ogtitle: "VSCO Motion Design",
        ogdescription: "Set of motion principles and to translate them as part of the brand system and VSCO's brand strategy.",
        ogimage: "https://cdn.sanity.io/images/e8r1mybk/production/bc2ad89e4c93b08a3136affc592ee77d1b001704-3342x1880.jpg"
      }
    },
    {
      title: "Rebrand & Packaging Design",
      client: "AYOND",
      year: "2023",
      slug: "ayond-rebrand-and-packaging-design",
      order: 4,
      description: "Brand identity and design system design, packaging design for Ayond— a desert-inspired skincare and lifestyle brand.",
      capabilities: ['brand-platforms', 'brand-strategy', 'design-strategy', 'brand-identity', 'packaging-design', 'art-direction', 'brand-guidelines-and-creative-toolkits', 'digital-product-design', 'brand-systems'],
      locations: ['new-york-ny'],
      nature: 'commercial',
      images: [
        "https://cdn.sanity.io/images/e8r1mybk/production/6f5e5dc8b33a626cb3c30723bc3fd4b572ac9917-5040x2835.jpg",
        "https://cdn.sanity.io/images/e8r1mybk/production/4bfb98e75a5eac35f9d6843c8bef89f0f2864052-5039x2835.jpg"
      ],
      featuredImage: "https://cdn.sanity.io/images/e8r1mybk/production/1573c9fbc21679935056cfab06ae247e9cbeea40-1125x1125.jpg",
      seo: {
        ogtitle: "Ayond Rebrand — New York",
        ogdescription: "Brand identity and design system design, packaging design for Ayond— a desert-inspired skincare and lifestyle brand.",
        ogimage: "https://cdn.sanity.io/images/e8r1mybk/production/77b5c466da75889364b4f3cb5d35b9503a49c948-5039x2835.jpg"
      }
    },
    {
      title: "iOS Brand Experience",
      client: "Open",
      year: "2020",
      slug: "open-ios-brand-experience",
      order: 5,
      description: "iOS App Design for Open streaming and booking services. Open is a social space for meditation, movement, and practice that combines traditions and technology. Broadcasting live from Los Angeles.",
      capabilities: ['interactive-design', 'design-systems', 'ux-ui', 'design-strategy', 'digital-product-design', 'curation'],
      locations: ['los-angeles-ca'],
      nature: 'commercial',
      images: [
        "https://cdn.sanity.io/images/e8r1mybk/production/279ce3b1ec3eb1471235446d94cf5121fd325ee3-5840x3286.jpg"
      ],
      featuredImage: "https://cdn.sanity.io/images/e8r1mybk/production/279ce3b1ec3eb1471235446d94cf5121fd325ee3-5840x3286.jpg",
      seo: {
        ogtitle: "iOS App Design for Open streaming and booking services.",
        ogdescription: "Open is a social space for meditation, movement, and practice that combines traditions and technology. Broadcasting live from Los Angeles.",
        ogimage: "https://cdn.sanity.io/images/e8r1mybk/production/279ce3b1ec3eb1471235446d94cf5121fd325ee3-5840x3286.jpg"
      }
    },
    {
      title: "Brand Storytelling Master's Identity",
      client: "ESCAC",
      year: "2021",
      slug: "escac-brand-storytelling-master-identity",
      order: 6,
      description: "Brand Identity for the new ESCAC's Master's Degree: Brand Storytelling led by Marc Sanchez and Luna Esquerdo.",
      capabilities: ['brand-systems', 'art-direction', 'brand-guidelines-and-creative-toolkits', 'brand-identity'],
      locations: ['barcelona'],
      nature: 'pro-bono',
      images: [
        "https://cdn.sanity.io/images/e8r1mybk/production/8738801c8cb04ca6c1673669b53af41f6f08f7e8-3343x1880.jpg",
        "https://cdn.sanity.io/images/e8r1mybk/production/72f5a3caf8c3596c83d8fb50c8252f847b63b019-3343x1880.jpg",
        "https://cdn.sanity.io/images/e8r1mybk/production/d36cee6920dfbca4831fc3569bb4c2da87206977-6863x3860.jpg",
        "https://cdn.sanity.io/images/e8r1mybk/production/a5f000191faccdfcb643e4b80c7b33ccfc93375e-3342x1880.jpg"
      ],
      featuredImage: "https://cdn.sanity.io/images/e8r1mybk/production/54090e83cc857ac9456f6f4ebd4cb78c1c59ff33-1286x1798.jpg",
      seo: {
        ogtitle: "ESCAC's Master's Degree Identity",
        ogdescription: "Brand Identity for the new ESCAC's Master's Degree: Brand Storytelling led by Marc Sanchez and Luna Esquerdo.",
        ogimage: "https://cdn.sanity.io/images/e8r1mybk/production/167d2cb2938b4f8a0a8015f87065d15e7a18eefd-6862x3861.jpg"
      }
    }
  ]

  // Delete existing projects first
  console.log('🗑️ Clearing existing projects...')
  try {
    const existingProjects = await client.fetch(`*[_type == "project"]._id`)
    if (existingProjects.length > 0) {
      for (const projectId of existingProjects) {
        await client.delete(projectId)
        console.log(`  ✅ Deleted project: ${projectId}`)
      }
    }
  } catch (error) {
    console.log('  ⚠️ Could not delete projects, they may not exist yet')
  }

  // Create all projects with full content
  console.log('📝 Creating projects with full content...')
  for (const project of projects) {
    try {
      // Process images
      const images = []
      if (project.images) {
        for (let i = 0; i < project.images.length; i++) {
          const imageAsset = await createImageAsset(project.images[i])
          if (imageAsset) {
            imageAsset._key = `image-${i}`
            images.push(imageAsset)
          }
        }
      }

      // Process featured image
      let featuredImage = null
      if (project.featuredImage) {
        featuredImage = await createImageAsset(project.featuredImage)
      }

      // Process videos
      const videos = project.videos ? project.videos.map((video, index) => ({
        _type: 'object',
        _key: `video-${index}`,
        vimeoId: video.vimeoId
      })) : []

      const projectData = {
        _type: 'project',
        _id: `project-${project.slug}`,
        title: project.title,
        client: project.client,
        year: project.year,
        slug: { current: project.slug },
        order: project.order,
        description: project.description,
        status: {
          isPublic: true,
          statusText: 'Published',
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
        images: images,
        videos: videos,
        featuredImage: featuredImage,
        seo: project.seo
      }

      await client.createOrReplace(projectData)
      console.log(`  ✅ Created project: ${project.client} - ${project.title}`)
    } catch (error) {
      console.log(`  ⚠️ Error creating project ${project.title}:`, error.message)
    }
  }

  // Update site settings with complete data
  console.log('⚙️ Updating comprehensive site settings...')
  try {
    await client.createOrReplace({
      _type: 'siteSettings',
      _id: 'site-settings',
      siteTitle: 'EST+6',
      siteUrl: 'https://estplus6-frontend-7t35lbzy5-bttr.vercel.app/',
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
        ogimage: {
          asset: {
            _type: 'reference',
            _ref: 'image-04dbc18cdf7bd73c6992ee9be8e69f43adb6af6e-3342x1880'
          }
        }
      },
      credits: [
        {
          _type: 'block',
          _key: 'credits-1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'credit-text',
              text: 'Build by ',
              marks: []
            },
            {
              _type: 'span',
              _key: 'credit-link',
              text: 'MARTILLO',
              marks: ['martillo-link']
            }
          ],
          markDefs: [
            {
              _type: 'link',
              _key: 'martillo-link',
              href: 'https://martillo.studio'
            }
          ]
        }
      ]
    })
    console.log('  ✅ Updated comprehensive site settings')
  } catch (error) {
    console.log('  ⚠️ Error updating site settings:', error.message)
  }

  console.log('✅ Comprehensive content import complete!')
  console.log('')
  console.log('📊 Summary:')
  console.log(`  • ${projects.length} projects imported`)
  console.log(`  • ${projects.reduce((acc, p) => acc + (p.images ? p.images.length : 0), 0)} images processed`)
  console.log(`  • ${projects.reduce((acc, p) => acc + (p.videos ? p.videos.length : 0), 0)} videos added`)
  console.log('')
  console.log('🌐 Your site is ready at: https://estplus6-frontend-7t35lbzy5-bttr.vercel.app')
  console.log('🎛️ Manage content at: http://localhost:3334')
}

// Run the import
if (require.main === module) {
  comprehensiveImport().catch(console.error)
}

module.exports = { comprehensiveImport }