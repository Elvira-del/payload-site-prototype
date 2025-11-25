'use client'

import { MapPin } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'

type Partner = {
  id: number
  name: string
  slug: string
  shortDescription?: string
  fullDescription?: string
  partnerType?: string
  country?: string
  region?: string
  products?: string[]
  isFeatured?: boolean
  showInTicker?: boolean
  priority?: number
}

type Props = {
  partners: Partner[]
}

const sortOptions = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'priority', label: 'Priority' },
]

export const PartnersList = ({ partners }: Props) => {
  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {partners.map((partner) => (
        <li
          key={partner.id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300"
        >
          <Link href={`/partners/${partner.slug}`}>
            <h3 className="text-lg font-semibold mb-2 leading-none">{partner.name}</h3>
            {partner.shortDescription && (
              <p className="text-gray-600 mb-4">{partner?.shortDescription}</p>
            )}
            {partner.country && (
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span>
                    {partner?.country}
                    {partner?.region ? ` • ${partner?.region}` : ''}
                  </span>
                </div>
              </div>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
