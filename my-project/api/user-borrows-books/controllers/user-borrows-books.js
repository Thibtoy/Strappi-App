'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
	async create(ctx) {
      	let entity;
      	let id = ctx.request.body.book? ctx.request.body.book : JSON.parse(ctx.request.body.data).book
      	let book = await strapi.services['book'].findOne({ id })

      	if (book.disponible) {
      		let date = new Date()
      		let month = ((date.getMonth() + 1) >= 10? (date.getMonth() + 1) : "0" + (date.getMonth() + 1) )

      		await strapi.services['book'].update({ id: book.id }, { disponible: false })

      		date = date.getFullYear()+"-"+month+"-"+date.getDate()

      		if (ctx.is('multipart')) {
       			const { data, files } = parseMultipartData(ctx);
       			data['date_of_borrow'] = date
        		entity = await strapi.services['user-borrows-books'].create(data, { files });
      		} else {
      			ctx.request.body['date_of_borrow'] = date
        		entity = await strapi.services['user-borrows-books'].create(ctx.request.body);
      		}
      		return 'You successfully borrowed this book';
  		}
      	else return 'This book has already been borrowed'
  	}
}