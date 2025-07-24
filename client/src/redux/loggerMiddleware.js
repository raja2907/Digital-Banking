export const loggerMiddleware = (storeAPI) => (next) => (action) => {
  console.log('%cDispatching:', 'color: green;', action);
  const result = next(action);
  console.log('%cNext state:', 'color: blue;', storeAPI.getState());
  return result;
};
