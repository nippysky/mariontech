export default {
  name: 'products',
  type: 'document',
  title: 'Products',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price',
    },
    {
      name: 'variation',
      type: 'array',
      of: [{type: 'string'}],
      title: 'Variation',
    },

    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
    {
      name: 'otherImages',
      type: 'array',
      of: [{type: 'image'}],
      title: 'Other Images',
    },
  ],
}
