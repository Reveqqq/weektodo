```js
// src/utils/popper.js

import { createPopper } from '@popperjs/core'

/**
 * Initialise a Popper.js instance.
 *
 * @param {HTMLElement|null|undefined} referenceEl – Element the popper is attached to.
 * @param {HTMLElement|null|undefined} popperEl – Popper element.
 * @param {Object} [options={}] – Popper options (see Popper docs).
 * @returns {{
 *   instance: import('@popperjs/core').Instance,
 *   destroy: () => void,
 *   update: () => Promise<void>
 * }|null}
 */
export function initPopper (referenceEl, popperEl, options = {}) {
  if (!referenceEl || !popperEl) {
    // Elements are not ready yet – caller should retry later.
    return null
  }

  const defaultOptions = {
    placement: 'auto',
    modifiers: [
      {
        name: 'offset',
        options: { offset: [0, 8] }
      },
      {
        name: 'preventOverflow',
        options: { boundary: 'clippingParents' }
      }
    ]
  }

  const popperInstance = createPopper(
    referenceEl,
    popperEl,
    Object.assign({}, defaultOptions, options)
  )

  const update = () => popperInstance.update()

  const destroy = () => {
    window.removeEventListener('resize', resizeHandler)
    popperInstance.destroy()
  }

  const resizeHandler = () => {
    update()
  }
  window.addEventListener('resize', resizeHandler)

  return {
    instance: popperInstance,
    destroy,
    update
  }
}

/**
 * Convenience wrapper to destroy a Popper instance.
 *
 * @param {{ destroy: Function }|null|undefined} popperObj
 */
export function disposePopper (popperObj) {
  if (popperObj && typeof popperObj.destroy === 'function') {
    popperObj.destroy()
  }
}
```