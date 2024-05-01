export const IMAGE = `//groq
_key,
_type,
"id": asset._ref,
"preview": asset->metadata.lqip,
hotspot { x, y },
crop {
  bottom,
  left,
  right,
  top,
},
"alt":asset->altText,
"tags": asset->opt.media.tags[]->name.current,
"description": asset->description,
"title": asset->title,
'height': asset->metadata.dimensions.height,
'url': asset->url,
'width': asset->metadata.dimensions.width,
'_ts':"SanityImageFragment"
`;
