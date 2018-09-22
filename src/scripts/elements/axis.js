export function update(axis, label, view=document) {
  const header = view.querySelector(`.${axis}-label`);
  header.textContent = label;
  view.setAttribute(`data-dimension-${axis}`, header.textContent);
  return header;
}

export function buildHeader(axis) {
  const header = document.createElement('div');
  header.classList.add(`${axis}-header`);
  const label = document.createElement('span');
  label.classList.add(`${axis}-label`);
  header.appendChild(label);
  return header;
}

export function buildLegend(axis, grid) {
  const header = buildHeader(axis);
  header.classList.add('z-legend');
  const list = document.createElement('ul');
  list.classList.add(`${axis}-values`);
  for(let z = grid[axis].first; z <= grid[axis].last; z++) {
    const value = document.createElement('li');
    value.classList.add(`${axis}-value`);
    value.setAttribute(`data-${axis}-gradient`, z);
    list.appendChild(value);
  }
  header.appendChild(list);
  return header;
}
