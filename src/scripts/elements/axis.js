export function update(axis, label, view=document) {
  const header = view.querySelector(`.label-${axis}`);
  header.textContent = label;
  view.setAttribute(`data-dimension-${axis}`, header.textContent);
  return header;
}

export function buildHeader(axis) {
  const header = document.createElement('div');
  header.classList.add(`header-${axis}`);
  const label = document.createElement('span');
  label.classList.add(`label-${axis}`);
  header.appendChild(label);
  return header;
}

export function buildLegend(axis, grid) {
  const header = buildHeader(axis);
  header.classList.add(`legend-${axis}`);
  const list = document.createElement('ul');
  list.classList.add(`values-${axis}`);
  for(let z = grid[axis].first; z <= grid[axis].last; z++) {
    const value = document.createElement('li');
    value.classList.add(`value-${axis}`);
    value.setAttribute(`data-gradient-${axis}`, z);
    list.appendChild(value);
  }
  header.appendChild(list);
  return header;
}
