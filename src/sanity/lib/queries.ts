import { groq } from 'next-sanity'

import { PAGE_HERO } from './fragments/pageHero'

const BLOCKS = `//groq
    (_type == "pageHero")=>{
      ${PAGE_HERO}
    },
`

export const pageQuery = groq`*[slug.current == $slug][0]{blocks[]{${BLOCKS}}}`
