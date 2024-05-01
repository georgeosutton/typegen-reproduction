import { defineArrayMember, defineField, defineType } from 'sanity'

import { createBlockField } from './createBlockField'

export default defineType({
  name: 'pageHero',
  type: 'object',
  title: 'Page Hero',
  fields: [
    createBlockField({
      styles: [
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'Normal', value: 'normal' },
      ],
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        subtitle: 'Page Hero',
      }
    },
  },
})
