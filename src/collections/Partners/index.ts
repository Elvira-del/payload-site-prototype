import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig<'partners'> = {
  slug: 'partners',
  labels: {
    singular: 'Partner',
    plural: 'Partners',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'partnerType', 'country', 'status', 'priority'],
    group: 'Collections',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: {
        description: 'Используется в URL: /partners/[slug]',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Short description',
      admin: {
        description: 'Отображается в списке партнёров и превью.',
      },
    },
    {
      name: 'fullDescription',
      type: 'richText',
      label: 'Full description',
      admin: {
        elements: ['h2', 'h3', 'link', 'ul', 'ol', 'blockquote'],
      },
    },

    {
      type: 'row',
      fields: [
        {
          name: 'partnerType',
          type: 'select',
          label: 'Partner type',
          options: [
            { label: 'Reseller', value: 'reseller' },
            { label: 'Integration', value: 'integration' },
            { label: 'Technology', value: 'technology' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'country',
          type: 'text',
          label: 'Country',
        },
        {
          name: 'region',
          type: 'text',
          label: 'Region',
        },
      ],
    },

    {
      name: 'products',
      type: 'text',
      label: 'Products',
      hasMany: true,
      admin: {
        description: 'С какими продуктами компании работает партнёр.',
      },
    },

    {
      type: 'row',
      fields: [
        {
          name: 'priority',
          type: 'number',
          label: 'Priority (sort order)',
          admin: {
            description: 'Меньше число — выше в списке. Оставь пустым, если не важно.',
          },
        },
        {
          name: 'isFeatured',
          type: 'checkbox',
          label: 'Featured partner',
          defaultValue: false,
        },
        {
          name: 'showInTicker',
          type: 'checkbox',
          label: 'Show in ticker (running line)',
          defaultValue: true,
        },
      ],
    },
  ],
}
