```javascript
export const useHover = () => {
  let hoverTimeout = null;
  let isHovered = false;

  const handleMouseEnter = (callback, delay = 200) => {
    clearTimeout(hoverTimeout);
    if (!isHovered) {
      hoverTimeout = setTimeout(() => {
        isHovered = true;
        callback();
      }, delay);
    }
  };

  const handleMouseLeave = (callback, delay = 300) => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      if (isHovered) {
        isHovered = false;
        callback();
      }
    }, delay);
  };

  const handleCardMouseEnter = () => {
    clearTimeout(hoverTimeout);
    isHovered = true;
  };

  const handleCardMouseLeave = (callback) => {
    handleMouseLeave(callback);
  };

  return {
    handleMouseEnter,
    handleMouseLeave,
    handleCardMouseEnter,
    handleCardMouseLeave
  };
};
```