

export function insertDom(child, parentDom) {
  if (child.children.length > 0) {
    for(let i = 0; i < child.children.length; i++) {
      insertDom(child.children[i], child.dom)
    }
  }
  parentDom.appendChild(child.dom)
}