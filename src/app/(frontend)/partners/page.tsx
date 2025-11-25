import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import PageClient from './page.client'
import { PartnersList } from '@/components/PartnersList'

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const partners = await payload.find({
    collection: 'partners',
    depth: 1,
    limit: 100,
    overrideAccess: false,
    sort: 'priority',
  })

  return (
    <main className="pt-24 pb-24">
      <PageClient />
      <section>
        <div className="container my-0 mx-auto">
          <div className="prose dark:prose-invert max-w-none">
            <h1 className="text-gray-900 mb-4">Partners</h1>
            <p className="text-gray-600">
              Here you can find our official partners and filter them by type, region, and products.
            </p>
          </div>

          <PartnersList partners={partners.docs} />
        </div>
      </section>
    </main>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Partners`,
  }
}
