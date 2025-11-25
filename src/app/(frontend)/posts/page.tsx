import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      heroImage: true,
    },
    sort: '-publishedAt',
  })

  return (
    <main className="pt-24 pb-24">
      <PageClient />
      <section>
        <div className="container my-0 mx-auto">
          <div className="prose dark:prose-invert max-w-none">
            <h1 className="text-gray-900 mb-4">Blog</h1>
          </div>

          <PageRange
            collection="posts"
            currentPage={posts.page}
            limit={12}
            totalDocs={posts.totalDocs}
          />

          <CollectionArchive posts={posts.docs} />

          {posts.totalPages > 1 && posts.page && (
            <Pagination page={posts.page} totalPages={posts.totalPages} />
          )}
        </div>
      </section>
    </main>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Blog`,
  }
}
