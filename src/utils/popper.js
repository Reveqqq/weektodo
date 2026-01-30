```javascript
import { createPopper } from '@popperjs/core';

export function setupPopper(reference, popper, options = {}) {
  const defaultOptions = {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'preventOverflow',
        options: {
          boundary: 'viewport',
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
          fallbackPlacements: ['top-start', 'bottom-start', 'top-end', 'bottom-end'],
        },
      },
    ],
    strategy: 'fixed',
  };

  const mergedOptions = { ...defaultOptions, ...options };
  return createPopper(reference, popper, mergedOptions);
}
```