const handleDragStart = event => {
  event.stopPropagation();
  const draggable = event.currentTarget;
  draggable.classList.add('dragging');
  event.dataTransfer.setData('text', draggable.id);
  event.dataTransfer.setDragImage(draggable, 20, 20);
  event.dataTransfer.effectAllowed = 'move';
};

const handleDragEnd = event => {
  event.stopPropagation();
  const draggable = event.currentTarget;
  draggable.classList.remove('dragging');
  draggable.closest('.dropzones').classList.remove('dragging');
};

export function build(id, zValue, element, options) {
  const figure = document.createElement('figure');
  if (options.display.avatar) {
    const avatar = document.createElement('img');
    avatar.src = element.avatar || options.display.missingAvatar;
    avatar.onerror = function () {
      this.src = options.display.onerrorAvatar;
      this.onerror = null;
    };
    figure.appendChild(avatar);
  }
  if (options.display.label) {
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = element.label;
    figure.appendChild(figcaption);
  }
  const draggableContent = document.createElement('div');
  draggableContent.className = 'draggable-content';
  draggableContent.setAttribute('data-gradient-z', zValue);
  draggableContent.appendChild(figure);
  const draggable = document.createElement('div');
  draggable.id = id;
  draggable.draggable = true;
  draggable.className = 'draggable';
  draggable.addEventListener('dragstart', handleDragStart);
  draggable.addEventListener('dragend', handleDragEnd);
  draggable.appendChild(draggableContent);
  return draggable;
}
