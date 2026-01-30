import { createPopper } from '@popperjs/core'

/**
 * Create a Popper.js instance with sensible defaults.
 *
 * @param {Element|HTMLElement} reference - The element the popper is positioned against.
 * @param {Element|HTMLElement} popper - The popper element.
 * @param {Object} [config={}] - Additional Popper configuration.
 * @param {string} [config.placement='auto'] - Desired placement.
 * @param {number[]} [config.offset=[0, 8]] - Offset modifier values.
 * @param {Array} [config.modifiers=[]] - Extra modifiers.
 * @returns {import('@popperjs/core').Instance} The created Popper instance.
 */
export function createPopperInstance(reference, popper, config = {}) {
  const {
    placement = 'auto',
    offset = [0, 8],
    modifiers = [],
    ...rest
  } = config

  const defaultModifiers = [
    { name: 'offset', options: { offset } },
    { name: 'flip', options: { fallbackPlacements: ['top', 'bottom', 'right', 'left'] } },
    { name: 'preventOverflow', options: { padding: 8 } },
    ...modifiers,
  ]

  return createPopper(reference, popper, {
    placement,
    modifiers: defaultModifiers,
    ...rest,
  })
}

/**
 * Safely destroy a Popper.js instance.
 *
 * @param {import('@popperjs/core').Instance|null|undefined} instance
 */
export function destroyPopper(instance) {
  if (instance && typeof instance.destroy === 'function') {
    instance.destroy()
  }
}