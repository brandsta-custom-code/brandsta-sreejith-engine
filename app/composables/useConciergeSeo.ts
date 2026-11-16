// app/composables/useConciergeSeo.ts
import { useHead, useSeoMeta } from 'nuxt/app'

export type ConciergeRouteKey = 'hub' | 'itineraries' | 'journal' | 'testimonials' | 'community'

interface ConciergeRouteMeta {
  path: string
  title: string
  description: string
}

const STUDIO_BASE_URL = 'https://sreejith.brandsta.cc'

const ROUTE_SEO_REGISTRY: Record<ConciergeRouteKey, ConciergeRouteMeta> = {
  hub: {
    path: '/',
    title: 'Digital Concierge | Sree Jith Travel - Brandsta',
    description:
      'A dedicated content management dashboard for Sree Jith Travel, featuring itineraries, insights, stories and website content - Powered by Brandsta.'
  },
  itineraries: {
    path: '/itineraries',
    title: 'Itineraries Studio | Digital Concierge - Sree Jith Travel',
    description:
      'Compose and publish bespoke travel routes, day-by-day chapters, inclusions, and synced listing cards for Sree Jith Travel - Powered by Brandsta.'
  },
  journal: {
    path: '/journal',
    title: 'Journal Studio | Digital Concierge - Sree Jith Travel',
    description:
      'Publish slow-travel stories, photography essays, and structured editorial blocks with automated cloud backups for Sree Jith Travel - Powered by Brandsta.'
  },
  testimonials: {
    path: '/testimonials',
    title: 'Testimonials Engine | Digital Concierge - Sree Jith Travel',
    description:
      'Curate verified guest reflections, bespoke journey impressions, and traveler reviews for Sree Jith Travel - Powered by Brandsta.'
  },
  community: {
    path: '/community',
    title: 'Community Engine | Digital Concierge - Sree Jith Travel',
    description:
      'Manage local artisans, regional hosts, and cultural partner profiles across Kerala and South India for Sree Jith Travel - Powered by Brandsta.'
  }
}

export function useConciergeSeo(routeKey: ConciergeRouteKey) {
  const entry = ROUTE_SEO_REGISTRY[routeKey]
  const canonicalUrl = `${STUDIO_BASE_URL}${entry.path}`

  useSeoMeta({
    title: entry.title,
    description: entry.description,
    robots: 'noindex, nofollow, noarchive',
    ogTitle: entry.title,
    ogDescription: entry.description,
    ogUrl: canonicalUrl,
    twitterTitle: entry.title,
    twitterDescription: entry.description
  })

  useHead({
    meta: [{ name: 'twitter:url', content: canonicalUrl }]
  })
}