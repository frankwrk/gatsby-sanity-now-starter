import { Styled } from 'theme-ui'

import PortableTextEditor from '../components/portable-text-editor.jsx'

export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  inputComponent: PortableTextEditor,
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        {
          title: 'Normal',
          value: 'normal',
        },
        {
          title: 'H1',
          value: 'h1',
          blockEditor: {
            render: Styled.h1,
          },
        },
        {
          title: 'H2',
          value: 'h2',
          blockEditor: {
            render: Styled.h2,
          },
        },
        {
          title: 'H3',
          value: 'h3',
          blockEditor: {
            render: Styled.h3,
          },
        },
        {
          title: 'H4',
          value: 'h4',
          blockEditor: {
            render: Styled.h4,
          },
        },
        {
          title: 'H5',
          value: 'h5',
          blockEditor: {
            render: Styled.h5,
          },
        },
        {
          title: 'H6',
          value: 'h6',
          blockEditor: {
            render: Styled.h6,
          },
        },
        {
          title: 'Quote',
          value: 'blockquote',
          blockEditor: {
            render: Styled.blockquote,
          },
        },
        {
          title: 'Code',
          value: 'pre',
          blockEditor: {
            render: Styled.pre,
          },
        },
      ],
      lists: [
        {
          title: 'Bullet',
          value: 'bullet',
        },
        {
          title: 'Numbered',
          value: 'number',
        },
      ],
      marks: {
        decorators: [
          {
            title: 'Strong',
            value: 'strong',
            blockEditor: {
              render: Styled.strong,
            },
          },
          {
            title: 'Emphasis',
            value: 'em',
            blockEditor: {
              render: Styled.em,
            },
          },
          {
            title: 'Code',
            value: 'code',
            blockEditor: {
              render: Styled.code,
            },
          },
          {
            title: 'Underline',
            value: 'underline',
            blockEditor: {
              render: Styled.u,
            },
          },
          {
            title: 'Strike',
            value: 'strike-through',
            blockEditor: {
              render: Styled.s,
            },
          },
        ],
        annotations: [
          {
            type: 'link',
          },
        ],
      },
    },
    {
      type: 'figure',
    },
  ],
}
