export function build(id, xValue, yValue, zValue, element, options) {
  const handleDragStart = event => {
    event.stopPropagation();
    event.dataTransfer.setData('text', event.currentTarget.id);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setDragImage(event.currentTarget, 20, 20);
  };
  const draggable = document.createElement('div');
  draggable.id = id;
  draggable.setAttribute('draggable', true);
  const figure = document.createElement('figure');
  figure.setAttribute('data-z-gradient', zValue);
  if (options.display.avatar && (element.avatar !== null)) {
    const avatar = document.createElement('img');
    const missingAvatar = options.display.missingAvatar;
    avatar.setAttribute('src', element.avatar || missingAvatar);
    const onerrorAvatar = options.display.onerrorAvatar;
    avatar.setAttribute('onerror',
      `this.src='${onerrorAvatar}'; this.onerror = null;`
    );
    figure.appendChild(avatar);
  }
  if (options.display.label) {
    const figcaption = document.createElement('figcaption');
    figcaption.append(element.label);
    figure.appendChild(figcaption);
  }
  draggable.appendChild(figure);
  draggable.addEventListener('dragstart', handleDragStart);
  return draggable;
}
