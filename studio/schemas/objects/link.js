import { Styled } from 'theme-ui'

export default {
  title: 'Link',
  name: 'link',
  type: 'object',
  blockEditor: {
    render: Styled.a,
  },
  fields: [
    {
      title: 'URL',
      name: 'href',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['https', 'http', 'mailto', 'tel'],
        }),
    },
    {
      title: 'External',
      name: 'external',
      description: 'Is this a link outside your site?',
      type: 'boolean',
    },
    {
      title: 'Open in new tab',
      name: 'blank',
      description: 'Should this link be opened in a new tab?',
      type: 'boolean',
    },
  ],
}
