//manually sets the caret to the end of the input
export const setCaretToEnd = (el) => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(el, 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
}