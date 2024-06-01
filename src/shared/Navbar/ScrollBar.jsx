export const calculateScrollbarWidth = () => {
    // Create a temporary element to calculate scrollbar width
    const tempElement = document.createElement('div');
    tempElement.style.width = '100px';
    tempElement.style.height = '100px';
    tempElement.style.overflow = 'scroll';
    tempElement.style.position = 'absolute';
    tempElement.style.top = '-9999px'; // Hide it off-screen
    document.body.appendChild(tempElement);

    // Calculate the scrollbar width
    const scrollbarWidth = tempElement.offsetWidth - tempElement.clientWidth;

    // Clean up: remove the temporary element
    document.body.removeChild(tempElement);

    return scrollbarWidth;
};