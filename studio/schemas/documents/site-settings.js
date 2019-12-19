import Icon from 'react-icons/lib/fa/cog'

export const siteSettings = {
  name: 'siteSettings',
  type: 'document',
  icon: Icon,
  title: 'Site Settings',
  __experimental_actions: ['update', 'publish'],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
  fields: [
    {
      name: 'icon',
      type: 'image',
      title: 'Favicon',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'url',
      type: 'url',
      title: 'URL',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Social Share image',
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
  ],
}
