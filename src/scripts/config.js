export const DEFAULTS = {
  style: ['powerade'],
  borders: ['left', 'bottom', 'top', 'right'],
  dimensions: {
    x: { cardinality: 4, label: 'x-dimension' },
    y: { cardinality: 4, label: 'y-dimension' },
    z: { cardinality: 4, label: 'z-dimension' }
  },
  display: {
    label: true,
    avatar: true,
    onerrorAvatar: 'https://github.com/identicons/error.png',
    missingAvatar: 'https://github.com/identicons/powerade.png'
  },
  dataset: {},
  handlers: {
    drop: (dropzone, dragged) => [dropzone, dragged]
  }
};
