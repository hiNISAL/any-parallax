export function $$(selector, root = document) {
  return [...root.querySelectorAll(selector)];
}

export function rmDup(arr) {
  const res = []
  for(let i = 0; i < arr.length; res.indexOf(arr[i++]) === -1 && res.push(arr[i - 1]));

  return res;
}
