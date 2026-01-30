```javascript
import { createPopper } from '@popperjs/core';

export const setupPopper = (reference, popper, options = {}) => {
  const defaultOptions = {
    placement: 'auto',
    modifiers: [
      {
        name: 'preventOverflow',
        options: {
          padding: 8,
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top', 'bottom'],
        },
      },
    ],
    ...options,
  };

  return createPopper(reference, popper, defaultOptions);
};

export const setupHoverPopper = (reference, popper) => {
  return setupPopper(reference, popper, {
    modifiers: [
      {
        name: 'eventListeners',
        enabled: false,
      },
      {
        name: 'hoverDelay',
        enabled: true,
        phase: 'beforeMain',
        fn: () => {},
      },
    ],
  });
};
```