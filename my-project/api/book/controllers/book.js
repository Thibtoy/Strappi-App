'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
	async findFiltered(ctx) {
      let entities;
      let types = ctx.request.query.types ? ctx.request.query.types.split(',') : false
      let authors = ctx.request.query.authors ? ctx.request.query.authors.split(',') : false

      if (authors.length > 0) 
      	authors = authors.map(author => author.split('-'))

      let results = await strapi.services['book'].findFiltered(types, authors)

      return results
    },
};
