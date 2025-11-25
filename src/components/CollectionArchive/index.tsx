import React from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <ul className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
      {posts?.map((result, index) => {
        if (typeof result === 'object' && result !== null) {
          return (
            <li className="col-span-4" key={index}>
              <Card
                className="mb-12 overflow-hidden hover:shadow-lg transition-shadow"
                doc={result}
                relationTo="posts"
                showCategories
              />
            </li>
          )
        }

        return null
      })}
    </ul>
  )
}
