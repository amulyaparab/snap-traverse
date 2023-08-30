export const useDebounce = (cb, delay) => {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb.apply(context, args);
    }, delay);
  };
};
