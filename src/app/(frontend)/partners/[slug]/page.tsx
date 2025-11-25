import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import PageClient from './page.client'
import { generateMeta } from '@/utilities/generateMeta'
import { cache } from 'react'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'

import type { Partner } from '@/payload-types'
import Link from 'next/link'
import { MoveLeft } from 'lucide-react'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const partners = await payload.find({
    collection: 'partners',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = partners.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Props = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Partner({ params: paramsPromise }: Props) {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/partners/' + decodedSlug
  const partner = await queryPartnerBySlug({ slug: decodedSlug })

  if (!partner) return <PayloadRedirects url={url} />

  return (
    <main>
      <section>
        <PageClient />

        <PayloadRedirects disableNotFound url={url} />

        <div className="container my-0 mx-auto">
          <Link href="/partners">
            <MoveLeft />
            Back to Partners
          </Link>
          <h1 className="text-4xl font-bold mt-4 mb-2">{partner.name}</h1>

          {partner.country && (
            <p className="text-sm text-gray-500 mb-4">
              {partner.country}
              {partner?.region ? ` • ${partner?.region}` : ''}
            </p>
          )}

          {partner.fullDescription && (
            <div className="prose dark:prose-invert max-w-none">
              <RichText data={partner.fullDescription} enableGutter={false} />
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Props): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const partner = await queryPartnerBySlug({ slug: decodedSlug })

  return generateMeta({ doc: partner })
}

const queryPartnerBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'partners',
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
