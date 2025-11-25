import type { Block } from 'payload'

export const PartnersTickerBlock: Block = {
  slug: 'partnersTicker',
  interfaceName: 'PartnersTickerBlock',
  labels: {
    singular: 'Partners Ticker',
    plural: 'Partners Tickers',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      admin: {
        description: 'Optional heading to display before the ticker (e.g., "Our Partners")',
      },
    },
    {
      name: 'displayMode',
      type: 'select',
      label: 'Display Mode',
      required: true,
      defaultValue: 'logos-and-names',
      options: [
        {
          label: 'Logos and Names',
          value: 'logos-and-names',
        },
        {
          label: 'Logos Only',
          value: 'logos-only',
        },
      ],
      admin: {
        description: 'Choose how to display partners in the ticker',
      },
    },
    {
      name: 'animationSpeed',
      type: 'number',
      label: 'Animation Speed (seconds)',
      defaultValue: 40,
      min: 10,
      max: 120,
      admin: {
        description: 'Duration in seconds for one complete animation cycle. Lower = faster.',
      },
    },
  ],
}
