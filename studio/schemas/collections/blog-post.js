import Icon from 'react-icons/lib/fa/file-text'

export const blogPost = {
  name: 'blogPost',
  type: 'document',
  icon: Icon,
  title: 'Blog Post',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 200,
      },
    },
    {
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      type: 'blockContent',
      title: 'Content',
      validation: (Rule) => Rule.required(),
    },
  ],
}
