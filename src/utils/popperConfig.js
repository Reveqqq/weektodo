```js
import { offset, flip, preventOverflow } from '@popperjs/core'

export default function getPopperConfig () {
  return {
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
  }
}
```