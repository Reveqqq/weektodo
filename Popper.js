```javascript
import { createPopper } from '@popperjs/core'

export function initPopper(referenceEl, popperEl) {
  return createPopper(referenceEl, popperEl, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 4]
        }
      },
      {
        name: 'preventOverflow',
        options: {
          padding: 8
        }
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top', 'right', 'left']
        }
      }
    ]
  })
}
```