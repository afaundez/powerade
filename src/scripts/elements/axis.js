export function update(axis, label, view=document) {
  const header = view.querySelector(`.label-${axis}`);
  header.textContent = label;
  view.setAttribute(`data-dimension-${axis}`, header.textContent);
  return header;
}

export function buildHeader(axis) {
  const label = document.createElement('span');
  label.className = `label-${axis}`;
  const header = document.createElement('div');
  header.className = `header-${axis}`;
  header.appendChild(label);
  return header;
}

export function buildLegend(axis, grid) {
  const list = document.createElement('ul');
  list.className = `values-${axis}`;
  for(let z = grid[axis].first; z <= grid[axis].last; z++) {
    const value = document.createElement('li');
    value.className = `value-${axis}`;
    value.setAttribute(`data-gradient-${axis}`, z);
    list.appendChild(value);
  }
  const header = buildHeader(axis);
  header.classList.add(`legend-${axis}`);
  header.appendChild(list);
  return header;
}
