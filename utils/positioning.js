```javascript
export function calculateHoverPosition(element, hoverElement, offset = 8) {
  const rect = element.getBoundingClientRect();
  const hoverRect = hoverElement.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  
  let top = rect.bottom + offset;
  let left = rect.left;
  
  // Проверка на доступное пространство снизу
  if (top + hoverRect.height > viewportHeight) {
    top = rect.top - hoverRect.height - offset;
  }
  
  // Проверка на выход за правую границу
  if (left + hoverRect.width > window.innerWidth) {
    left = window.innerWidth - hoverRect.width - offset;
  }
  
  // Проверка на выход за левую границу
  if (left < 0) {
    left = offset;
  }
  
  return {
    top: Math.max(offset, top),
    left: Math.max(offset, left),
    availableSpace: viewportHeight - top
  };
}

export function isMouseInHoverArea(event, element, hoverElement) {
  if (!element || !hoverElement) return false;
  
  const elementRect = element.getBoundingClientRect();
  const hoverRect = hoverElement.getBoundingClientRect();
  
  const expandedRect = {
    top: Math.min(elementRect.top, hoverRect.top),
    bottom: Math.max(elementRect.bottom, hoverRect.bottom),
    left: Math.min(elementRect.left, hoverRect.left),
    right: Math.max(elementRect.right, hoverRect.right)
  };
  
  return (
    event.clientX >= expandedRect.left &&
    event.clientX <= expandedRect.right &&
    event.clientY >= expandedRect.top &&
    event.clientY <= expandedRect.bottom
  );
}
```