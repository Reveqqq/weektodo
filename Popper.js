```javascript
import { createPopper } from '@popperjs/core';

export default {
  methods: {
    setupPopper(el, popper, placement) {
      return createPopper(el, popper, {
        placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
          {
            name: 'preventOverflow',
            options: {
              padding: 8,
            },
          },
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['top', 'bottom'],
            },
          },
        ],
      });
    },
  },
};
```