Вот обновленный код файла `Popper.js`:

```javascript
export function createPopper(reference, popper, options = {}) {
  const defaultOptions = {
    placement: 'auto',
    modifiers: [
      {
        name: 'preventOverflow',
        options: {
          boundary: 'viewport',
          padding: 8,
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top', 'bottom'],
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
    strategy: 'fixed',
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return {
    update() {
      const referenceRect = reference.getBoundingClientRect();
      const popperRect = popper.getBoundingClientRect();
      
      let placement = mergedOptions.placement;
      if (placement === 'auto') {
        placement = window.innerHeight - referenceRect.bottom > popperRect.height 
          ? 'bottom' 
          : 'top';
      }

      let top, left;
      switch (placement) {
        case 'bottom':
          top = referenceRect.bottom + mergedOptions.modifiers.find(m => m.name === 'offset').options.offset[1];
          break;
        case 'top':
          top = referenceRect.top - popperRect.height - mergedOptions.modifiers.find(m => m.name === 'offset').options.offset[1];
          break;
        default:
          top = referenceRect.bottom + mergedOptions.modifiers.find(m => m.name === 'offset').options.offset[1];
      }

      left = referenceRect.left + (referenceRect.width - popperRect.width) / 2;
      
      popper.style.position = mergedOptions.strategy;
      popper.style.top = `${Math.max(0, top)}px`;
      popper.style.left = `${Math.max(0, left)}px`;
    },
    destroy() {
      popper.style.position = '';
      popper.style.top = '';
      popper.style.left = '';
    },
  };
}
```