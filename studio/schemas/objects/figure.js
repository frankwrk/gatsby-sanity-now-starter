export default {
  name: 'figure',
  title: 'Figure',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: 'alt',
      title: 'Alternative text (for screen readers)',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        isHighlighted: true,
      },
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      options: {
        isHighlighted: true,
      },
    },
    {
      name: 'width',
      title: 'Width (leave empty for 100%)',
      type: 'number',
      options: {
        isHighlighted: true,
      },
    },
    {
      name: 'height',
      title: 'Height (leave empty for auto)',
      type: 'number',
      options: {
        isHighlighted: true,
      },
    },
  ],
}
