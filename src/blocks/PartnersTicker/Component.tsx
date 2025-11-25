import React, { cache, Suspense } from 'react'
import Link from 'next/link'
import type {
  Media as MediaType,
  PartnersTickerBlock as PartnersTickerBlockType,
} from '@/payload-types'
import { Media } from '@/components/Media'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

type Partner = {
  id: number
  name: string
  slug: string
  logo?: number | MediaType | null | undefined
}

const getTickerPartners = cache(async (): Promise<Partner[]> => {
  const payload = await getPayload({ config: configPromise })
  const partners = await payload.find({
    collection: 'partners',
    where: {
      and: [
        {
          showInTicker: {
            equals: true,
          },
          status: {
            equals: 'published',
          },
        },
      ],
    },
    sort: 'priority',
    limit: 100,
    depth: 1,
  })

  return partners.docs
})

function TickerSkeleton() {
  return (
    <div className="overflow-hidden bg-neutral-50 border-y">
      <div className="mx-auto max-w-6xl py-4 px-4">
        <div className="h-10 bg-neutral-200 animate-pulse rounded" />
      </div>
    </div>
  )
}

async function TickerContent({ heading, displayMode, animationSpeed }: PartnersTickerBlockType) {
  const partners = await getTickerPartners()

  if (!partners.length) {
    return null
  }

  const duplications = partners.length < 5 ? 8 : 4
  const items = Array(duplications).fill(partners).flat()
  const speed = animationSpeed || 40

  return (
    <div className="overflow-hidden bg-neutral-50 border-y">
      <div className="w-full py-4 px-4">
        <div className="flex items-center gap-6">
          {heading && (
            <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500 shrink-0">
              {heading}
            </span>
          )}

          <div className="relative flex-1 overflow-hidden">
            <div
              className="ticker flex gap-12 items-center"
              style={
                {
                  '--ticker-speed': `${speed}s`,
                } as React.CSSProperties
              }
            >
              {items.map((partner, index) => (
                <Link
                  key={`${partner.id}-${index}`}
                  href={`/partners/${partner.slug}`}
                  className="flex items-center gap-3 shrink-0 hover:opacity-75 transition-opacity group"
                >
                  {partner.logo && displayMode !== 'logos-only' ? (
                    // Logos and Names mode
                    <>
                      <div className="partner-logo-wrapper">
                        <Media
                          resource={partner.logo}
                          className="partner-logo"
                          imgClassName="partner-logo-img"
                        />
                      </div>
                      <span className="text-sm font-medium text-neutral-700 group-hover:text-black whitespace-nowrap">
                        {partner.name}
                      </span>
                    </>
                  ) : partner.logo && displayMode === 'logos-only' ? (
                    // Logos Only mode
                    <div className="partner-logo-wrapper">
                      <Media
                        resource={partner.logo}
                        className="partner-logo"
                        imgClassName="partner-logo-img"
                      />
                    </div>
                  ) : (
                    // Fallback: show name if no logo
                    <span className="text-sm font-medium text-neutral-700 group-hover:text-black whitespace-nowrap">
                      {partner.name}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PartnersTickerBlock(props: PartnersTickerBlockType) {
  return (
    <Suspense fallback={<TickerSkeleton />}>
      <TickerContent {...props} />
    </Suspense>
  )
}
