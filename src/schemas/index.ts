import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import page from './page'
import pageHero from './pageHero'
import post from './post'

export const schemaTypes = [post, blockContent]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blockContent, pageHero, page],
}
