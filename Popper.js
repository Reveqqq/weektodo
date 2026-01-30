```javascript
import { createPopper } from '@popperjs/core';

export default {
  methods: {
    setupPopper(element, popper, options = {}) {
      const defaultOptions = {
        placement: 'top',
        modifiers: [
          {
            name: 'preventOverflow',
            options: {
              padding: 8,
              boundariesElement: 'viewport'
            }
          },
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['top', 'bottom']
            }
          }
        ],
        ...options
      };

      return createPopper(element, popper, defaultOptions);
    },
    updatePopper(popperInstance) {
      if (popperInstance) {
        popperInstance.update();
      }
    },
    destroyPopper(popperInstance) {
      if (popperInstance) {
        popperInstance.destroy();
      }
    }
  }
};
```