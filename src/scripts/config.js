export const DEFAULTS = {
  style: ['powerade'],
  border: ['left', 'bottom', 'top', 'right'],
  dimensions: {
    x: { cardinality: 4, label: 'x-dimension' },
    y: { cardinality: 4, label: 'y-dimension' },
    z: { cardinality: 4, label: 'z-dimension' }
  },
  display: {
    label: true,
    avatar: true,
    onerror_avatar: 'https://github.com/identicons/error.png',
    missing_avatar: 'https://github.com/identicons/powerade.png'
  },
  dataset: {},
  handlers: {
    drop: (dropzone, dragged) => [dropzone, dragged]
  }
};
