//todo: prisma 2 missisng subscription....
export default {
  movies: {
    subscribe: () => {},
    resolve: (payload: void) => {
      return payload;
    },
  }
};