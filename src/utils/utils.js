export function $$(selector, root = document) {
  return [...root.querySelectorAll(selector)];
}