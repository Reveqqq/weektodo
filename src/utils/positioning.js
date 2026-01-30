```javascript
export function calculateHoverPosition(element, hoverElement, margin = 8) {
  const rect = element.getBoundingClientRect();
  const hoverRect = hoverElement.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  const spaceAbove = rect.top;
  const spaceBelow = viewportHeight - rect.bottom;

  const position = {
    left: rect.left + window.scrollX,
    top: null,
    isAbove: false
  };

  if (spaceBelow > hoverRect.height || spaceBelow > spaceAbove) {
    position.top = rect.bottom + window.scrollY + margin;
    position.isAbove = false;
  } else {
    position.top = rect.top + window.scrollY - hoverRect.height - margin;
    position.isAbove = true;
  }

  return position;
}

export function isCursorBetweenElements(element, hoverElement, clientX, clientY) {
  const elementRect = element.getBoundingClientRect();
  const hoverRect = hoverElement.getBoundingClientRect();

  const betweenX = clientX >= Math.min(elementRect.left, hoverRect.left) && 
                   clientX <= Math.max(elementRect.right, hoverRect.right);
  const betweenY = clientY >= Math.min(elementRect.top, hoverRect.top) && 
                   clientY <= Math.max(elementRect.bottom, hoverRect.bottom);

  return betweenX && betweenY;
}
```