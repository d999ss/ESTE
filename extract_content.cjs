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

// Original site data from _payload.json
const originalData = [{"data":1,"prerenderedAt":1005},["Reactive",2],{"siteSettings":3,"menuTerms":75,"homeHero":77,"menuWorks":197,"homepage":199,"projects":208,"menuAbout":934,"seoSettingsData":936,"locations":940,"years":948,"natures":955,"cabapibilities":962},{"contact":4,"siteTitle":6,"siteUrl":7,"siteLanguage":8,"siteFavicon":9,"seo":43,"socialLinks":48,"credits":55},{"email":5},"hi@estplus6.com","EST+6","https://estplus6.com/","en",{"asset":10},{"metadata":11,"url":41,"originalFilename":42},{"dimensions":12,"isOpaque":16,"blurHash":17,"_type":18,"palette":19,"hasAlpha":16,"lqip":40},{"height":13,"_type":14,"width":13,"aspectRatio":15},512,"sanity.imageDimensions",1,true,"e5ATi,of00j[00ofM{WB%May00ayIUWB_3ofxuWBM{of00ay~qj[%M","sanity.imageMetadata",{"darkVibrant":20,"lightMuted":25,"vibrant":29,"dominant":31,"_type":34,"darkMuted":35,"muted":36,"lightVibrant":39},{"foreground":21,"title":21,"population":22,"background":23,"_type":24},"#fff",0,"#424242","sanity.imagePaletteSwatch",{"title":21,"population":26,"background":27,"_type":24,"foreground":28},0.14,"#bcbcbc","#000",{"background":30,"_type":24,"foreground":21,"title":21,"population":22},"#7f7f7f",{"title":21,"population":32,"background":33,"_type":24,"foreground":21},0.17,"#3c3c3c","sanity.imagePalette",{"_type":24,"foreground":21,"title":21,"population":32,"background":33},{"population":37,"background":38,"_type":24,"foreground":21,"title":21},0.15,"#7c7c7c",{"foreground":28,"title":21,"population":22,"background":27,"_type":24},"data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAMEBgUI/8QAJBAAAQQCAgIBBQAAAAAAAAAAAQACAwQFEQYxElEhExQVkaH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A844DEw2WGzeLvoA6DW9uWm/DcfyUZghikpWNEMl8/JpcPYVbjMByHHz9rp1is4+UY70ejpSwU5Yngua5jGa+XDWgPn+lBhrld9S1LBKNPjcWlFZzdhtrKTysO2l3ftEEFG5ZozianM+GUdOYdK7kuQZTJM8LluSRvrrf6REHKREQf//Z","https://cdn.sanity.io/images/e8r1mybk/production/ea2d6c619c0cab6dd1676f50b1a2cd935c6a7a40-512x512.svg","estplus6-favico.svg",{"ogdescription":44,"ogimage":45,"ogtitle":6},"This is the default meta description",{"asset":46},{"url":47},"https://cdn.sanity.io/images/e8r1mybk/production/04dbc18cdf7bd73c6992ee9be8e69f43adb6af6e-3342x1880.jpg",[49,52],{"url":50,"title":51},"https://www.linkedin.com/company/estplus6/","LinkedIn",{"title":53,"url":54},"IG","https://www.instagram.com/estplus6/",[56],{"markDefs":57,"children":62,"_type":72,"style":73,"_key":74},[58],{"_type":59,"href":60,"_key":61},"link","https://martillo.studio","d62b3839a0d5",[63,68],{"_type":64,"marks":65,"text":66,"_key":67},"span",[],"Build by ","aff65d970fdd0",{"_key":69,"_type":64,"marks":70,"text":71},"57a5e9c9e740",[61],"MARTILLO","block","normal","5f689cde9418",{"title":76},"Terms & Conditions",{"video":78,"project":79,"gallery":142},"https://player.vimeo.com/progressive_redirect/playback/918290535/rendition/1080p/file.mp4?loc=external&log_user=0&signature=8cbaad3ce6a5239a01169e840c619658c56b8c113c32d6b185bdec7457d76b82",{"client":80,"title":81,"year":82,"_id":83,"capabilities":84,"locations":129,"order":133,"seo":134,"slug":141},"VSCO","Brand Platform Relaunch","2023","aaabe1d1-f701-4cbf-974a-94a69554283c",[85,89,93,97,101,105,109,113,117,121,125],{"code":86,"title":87,"slug":88},"BP","Brand platforms","brand-platforms",{"slug":90,"code":91,"title":92},"brand-strategy","BS","Brand strategy",{"title":94,"slug":95,"code":96},"Design Strategy","design-strategy","DS",{"slug":98,"code":99,"title":100},"brand-identity","B.ID","Brand Identity",{"slug":102,"code":103,"title":104},"art-direction","AD","Art Direction",{"title":106,"slug":107,"code":108},"Marketing Design","marketing-design","MK.D",{"code":110,"title":111,"slug":112},"BA","Brand Audit","brand-audit",{"slug":114,"code":115,"title":116},"brand-guidelines-and-creative-toolkits","G","Brand Guidelines & Creative Toolkits",{"title":118,"slug":119,"code":120},"Curation","curation","C",{"title":122,"slug":123,"code":124},"Brand Implementation","brand-implementation","BI",{"slug":126,"code":127,"title":128},"brand-systems","BDS","Brand Systems",[130],{"title":131,"slug":132},"Oakland, CA","oakland-ca",6,{"ogimage":135,"_type":138,"ogdescription":139,"ogtitle":140},{"asset":136},{"url":137},"https://cdn.sanity.io/images/e8r1mybk/production/19470447762c272a39e2aae871cff8a1e2453114-3342x1880.jpg","seo","Brand and Design Strategy, Brand Identity Redesign, and Brand Implementation for VSCO's new business and audience shift.","Visual Supply Company ","vsco-brand-platform-relaunch"]

async function extractAndImportContent() {
  console.log('🚀 Extracting content from original site and importing to new Sanity project...')

  // Helper function to extract nested values from the original data structure
  function getValue(index) {
    return originalData[index]
  }

  // Extract projects data - the projects array starts at index 208
  const projects = [
    {
      title: "Brand Platform Relaunch",
      client: "VSCO",
      year: "2023",
      slug: "vsco-brand-platform-relaunch",
      order: 1,
      description: "Brand and Design Strategy, Brand Identity Redesign, and Brand Implementation for VSCO's new business and audience shift.",
      capabilities: ['brand-platforms', 'brand-strategy', 'brand-identity', 'art-direction'],
      locations: ['oakland-ca'],
      nature: 'commercial',
      images: [
        "https://cdn.sanity.io/images/e8r1mybk/production/19470447762c272a39e2aae871cff8a1e2453114-3342x1880.jpg",
        "https://cdn.sanity.io/images/e8r1mybk/production/b66e1e82d93244730a8ab3469cf66759da53038a-3342x1880.jpg"
      ],
      videos: [
        {
          vimeoId: "918290535"
        }
      ]
    },
    {
      title: "Perfume Packaging Design",
      client: "AYOND",
      year: "2023",
      slug: "ayond-perfume-packaging-design",
      order: 2,
      description: "Packaging design for Ayond's Perfume collections. Introducing the desert line symbolizes the rugged beauty of the desert that celebrates desert resilience.",
      capabilities: ['packaging-design', 'brand-strategy', 'brand-identity'],
      locations: ['new-york-ny'],
      nature: 'commercial',
      images: [
        "https://cdn.sanity.io/images/e8r1mybk/production/5459b00bc31c0d893e7b5ec73b7cab8f0bec06ad-2000x1126.jpg",
        "https://cdn.sanity.io/images/e8r1mybk/production/e3bdfbf5b16042dce2094bdf9df6664e708313a4-701x968.jpg"
      ]
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
        "https://cdn.sanity.io/images/e8r1mybk/production/1573c9fbc21679935056cfab06ae247e9cbeea40-1125x1125.jpg",
        "https://cdn.sanity.io/images/e8r1mybk/production/0d55012d161660ffb36b205cb20123173ca7d4ae-3342x1880.jpg"
      ],
      videos: [
        {
          vimeoId: "946661075"
        }
      ]
    },
    {
      title: "Rebrand & Packaging Design",
      client: "AYOND",
      year: "2023",
      slug: "ayond-rebrand-and-packaging-design",
      order: 4,
      description: "Brand identity and design system design, packaging design for Ayond— a desert-inspired skincare and lifestyle brand.",
      capabilities: ['brand-platforms', 'brand-strategy', 'design-strategy', 'brand-identity', 'packaging-design', 'art-direction'],
      locations: ['new-york-ny'],
      nature: 'commercial',
      images: [
        "https://cdn.sanity.io/images/e8r1mybk/production/6f5e5dc8b33a626cb3c30723bc3fd4b572ac9917-5040x2835.jpg",
        "https://cdn.sanity.io/images/e8r1mybk/production/4bfb98e75a5eac35f9d6843c8bef89f0f2864052-5039x2835.jpg"
      ]
    },
    {
      title: "iOS Brand Experience",
      client: "Open",
      year: "2020",
      slug: "open-ios-brand-experience",
      order: 5,
      description: "iOS App Design for Open streaming and booking services. Open is a social space for meditation, movement, and practice that combines traditions and technology. Broadcasting live from Los Angeles.",
      capabilities: ['interactive-design', 'design-systems', 'brand-identity'],
      locations: ['los-angeles-ca'],
      nature: 'commercial',
      images: [
        "https://cdn.sanity.io/images/e8r1mybk/production/279ce3b1ec3eb1471235446d94cf5121fd325ee3-5840x3286.jpg"
      ]
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
        "https://cdn.sanity.io/images/e8r1mybk/production/72f5a3caf8c3596c83d8fb50c8252f847b63b019-3343x1880.jpg"
      ]
    }
  ]

  // Delete existing projects first
  console.log('🗑️ Clearing existing projects...')
  const existingProjects = await client.fetch(`*[_type == "project"]._id`)
  if (existingProjects.length > 0) {
    for (const projectId of existingProjects) {
      await client.delete(projectId)
      console.log(`  ✅ Deleted project: ${projectId}`)
    }
  }

  // Import new projects
  console.log('📝 Importing projects with full content...')
  for (const project of projects) {
    try {
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
        // Add images as asset references (pointing to existing Sanity CDN)
        images: project.images ? project.images.map((imageUrl, index) => ({
          _type: 'image',
          _key: `image-${index}`,
          asset: {
            _type: 'reference',
            _ref: imageUrl.split('/').pop().split('-')[0] + '-' + imageUrl.split('-').slice(-1)[0].replace(/\.[^/.]+$/, "")
          }
        })) : [],
        // Add videos
        videos: project.videos ? project.videos.map((video, index) => ({
          _type: 'object',
          _key: `video-${index}`,
          vimeoId: video.vimeoId
        })) : [],
        seo: {
          ogtitle: `${project.client} — ${project.title}`,
          ogdescription: project.description,
        }
      }

      await client.createOrReplace(projectData)
      console.log(`  ✅ Created project: ${project.client} - ${project.title}`)
    } catch (error) {
      console.log(`  ⚠️ Error creating project ${project.title}:`, error.message)
    }
  }

  // Update site settings with proper data
  console.log('⚙️ Updating site settings...')
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
              marks: ['link']
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
    console.log('  ✅ Updated site settings')
  } catch (error) {
    console.log('  ⚠️ Error updating site settings:', error.message)
  }

  console.log('✅ Content extraction and import complete!')
}

// Run the import
if (require.main === module) {
  extractAndImportContent().catch(console.error)
}

module.exports = { extractAndImportContent }