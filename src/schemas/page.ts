import { defineField, defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'page',
  title: 'Page',
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // Title
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    // Slug
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        slugify: (input) => {
          return '/' + input.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
        },
      },
      validation: (rule) =>
        rule.required().custom((param) => {
          if (param?.current) {
            if (!param.current.startsWith('/')) {
              return `Slug must begin with / click "Generate" to reset.`
            }
          }
          return true
        }),
    }),
    // Page Blocks
    {
      name: 'blocks',
      type: 'array',
      title: 'Page Blocks',
      validation: (Rule) => Rule.min(1).error('The page has no content.'),
      of: [{ type: 'pageHero' }],
      group: 'editorial',
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
    },
    prepare(selection) {
      const { title, slug } = selection

      return {
        title,
        subtitle: slug?.current,
      }
    },
  },
})
