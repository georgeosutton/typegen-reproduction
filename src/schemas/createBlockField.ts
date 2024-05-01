import {
  ArrayOfType,
  BlockListDefinition,
  BlockMarksDefinition,
  BlockStyleDefinition,
  defineField,
  PortableTextBlock,
  PortableTextChild,
} from 'sanity'

export const createBlockField = ({
  of = [],
  styles = [],
  marks = { decorators: [], annotations: [] },
  lists = [],
  name = 'text',
  title = 'Text',
  description,
  fieldset,
}: {
  of?: ArrayOfType[]
  styles?: BlockStyleDefinition[]
  marks?: BlockMarksDefinition
  lists?: BlockListDefinition[]
  name?: string
  title?: string
  description?: string
  fieldset?: string
} = {}) =>
  defineField({
    type: 'array',
    title,
    name,
    description,
    fieldset,
    of: [
      {
        type: 'block',
        styles,
        marks,
        lists,
      },
      ...of,
    ],
    validation: (Rule) =>
      Rule.custom((blocks) => {
        const emptyBlocks = ((blocks as PortableTextBlock[]) || []).filter(
          (block) =>
            block._type === 'block' &&
            (block.children as PortableTextChild[]).every(
              (span) =>
                span._type === 'span' && (span.text as string).trim() === '',
            ),
        )

        const emptyPaths = emptyBlocks.map(
          (block, index) => [{ _key: block._key }] || [index],
        )

        return emptyPaths.length === 0
          ? true
          : {
              message: 'Paragraph cannot be empty',
              paths: emptyPaths,
            }
      }),
  })
