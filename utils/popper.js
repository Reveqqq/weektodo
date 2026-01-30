```js
// src/utils/popper.js

import { createPopper } from '@popperjs/core'

/**
 * Initialise a Popper.js instance.
 *
 * @param {HTMLElement} referenceEl – Element the popper is attached to.
 * @param {HTMLElement} popperEl – Popper element.
 * @param {Object} [options={}] – Popper options (see Popper docs).
 * @returns {{
 *   instance: import('@popperjs/core').Instance,
 *   destroy: () => void,
 *   update: () => Promise<void>
 * }}
 */
export function initPopper (referenceEl, popperEl, options = {}) {
  if (!referenceEl || !popperEl) {
    throw new Error('Both referenceEl and popperEl must be provided to initPopper')
  }

  const defaultOptions = {
    placement: 'auto',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8]
        }
      },
      {
        name: 'preventOverflow',
        options: {
          boundary: 'clippingParents'
        }
      }
    ]
  }

  const popperInstance = createPopper(
    referenceEl,
    popperEl,
    Object.assign({}, defaultOptions, options)
  )

  const destroy = () => {
    popperInstance.destroy()
  }

  const update = () => {
    return popperInstance.update()
  }

  // Re‑calculate on viewport changes
  const resizeHandler = () => {
    update()
  }
  window.addEventListener('resize', resizeHandler)

  // Clean up the resize listener when the instance is destroyed
  const originalDestroy = destroy
  const wrappedDestroy = () => {
    window.removeEventListener('resize', resizeHandler)
    originalDestroy()
  }

  return {
    instance: popperInstance,
    destroy: wrappedDestroy,
    update
  }
}

/**
 * Convenience wrapper to destroy a Popper instance.
 *
 * @param {{ destroy: Function }} popperObj
 */
export function disposePopper (popperObj) {
  if (popperObj && typeof popperObj.destroy === 'function') {
    popperObj.destroy()
  }
}
```