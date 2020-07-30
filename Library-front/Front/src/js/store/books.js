import autodux from 'autodux'

export const {
  reducer,
  initial,
  actions: {
    setAuthors,
    setTypes,
  },
  selectors: {
    getAuthors,
    getTypes,
  }
} = autodux({
  slice: 'books',
  actions: {
    setAuthors: (state, authors) => {
      if (!state.authors) state.authors = new Object()
      authors.forEach(author => state.authors[author["first_name"]+'-'+author["last_name"]] = author)

      return state
    },
    setTypes: (state, types) => {
      if (!state.types) state.types = new Object()
      types.forEach(type => state.types[type.name] = type)

      return state
    },
  },
  initial: {
    authors: false,
    types: false,
  }
})