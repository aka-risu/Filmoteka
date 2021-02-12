function getWidth() {
  return Math.max(
    // document.body.scrollWidth,
    // document.documentElement.scrollWidth,
    document.body.offsetWidth,
    // document.documentElement.offsetWidth,
    // document.documentElement.clientWidth,
  );
}
console.log('Width:  ' + getWidth());
export default getWidth;
