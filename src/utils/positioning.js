```javascript
export function calculatePosition(element, hoverElement, offset = 8) {
  const elementRect = element.getBoundingClientRect();
  const hoverRect = hoverElement.getBoundingClientRect();
  
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  
  let top = elementRect.bottom + offset;
  let left = elementRect.left;
  
  // Check if hover card fits below the element
  if (top + hoverRect.height > viewportHeight) {
    // Try to position above if doesn't fit below
    top = elementRect.top - hoverRect.height - offset;
    
    // If still doesn't fit, adjust to viewport
    if (top < 0) {
      top = Math.max(8, viewportHeight - hoverRect.height - 8);
    }
  }
  
  // Check horizontal overflow
  if (left + hoverRect.width > viewportWidth) {
    left = Math.max(8, viewportWidth - hoverRect.width - 8);
  } else if (left < 0) {
    left = 8;
  }
  
  return {
    top: Math.round(top),
    left: Math.round(left),
    right: viewportWidth - (left + hoverRect.width),
    bottom: viewportHeight - (top + hoverRect.height)
  };
}
```