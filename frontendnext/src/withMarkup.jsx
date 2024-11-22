//
// NOT CURRENTLY IN USE BUT LEFT HERE FOR REFRENCEN
// Based on 'Update 2' of https://stackoverflow.com/a/56859650/364088
//
const withMarkup = (query) => (text) => 
  query((content, node) => {
    const hasText = (node) => node.textContent === text;
    const childrenDontHaveText = Array.from(node.children).every(
      (child) => !hasText(child)
    );
    return hasText(node) && childrenDontHaveText;
  });

export default withMarkup;

