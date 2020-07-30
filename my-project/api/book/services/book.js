'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
	async findFiltered(types, authors) {
	  const results = await strapi
		  .query('book')
		  .model.query(qb => {
		  	if (types.length > 0) {
		  		qb.leftJoin('books_types__types_books', 'books_types__types_books.book_id', '=', 'books.id');
		  		qb.leftJoin('types', 'types.id', '=', 'books_types__types_books.type_id');
		    	qb.whereIn('types.name', types);
		  	}
		  	if (authors.length > 0) {
		  		let firstNames;
		  		let lastNames;
		  		qb.leftJoin('authors', 'authors.id', '=', 'books.author');

		  		authors.forEach((author, i) => {
		  			if (0 === i)
	  					qb.where('authors.first_name', author[0]).andWhere('authors.last_name', author[1]);
		  			else qb.orWhere('authors.first_name', author[0]).andWhere('authors.last_name', author[1]);
		  		})
		  	}
		  })
		  .fetchAll();
 
      return results.map(result => result.toJSON());
    },
};
