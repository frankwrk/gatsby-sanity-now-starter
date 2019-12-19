import S from '@sanity/desk-tool/structure-builder'

const singletons = [
  {
    title: 'Site Settings',
    document: 'siteSettings',
  },
]

export default () =>
  S.list()
    .title('Content')
    .items([
      ...singletons.map(({ title, document }) =>
        S.listItem()
          .title(title)
          .icon(
            S.documentTypeListItems().find((s) => s.spec.id === document).spec
              .schemaType.icon
          )
          .child(
            S.document()
              .schemaType(document)
              .documentId(document)
          )
      ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (i) =>
          !Object.values(singletons)
            .map(({ document }) => document)
            .includes(i.getId())
      ),
    ])
