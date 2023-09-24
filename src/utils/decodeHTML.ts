export default function decodeHTML(data: string): string | null {
  const divElement = document.createElement('div');
  divElement.innerHTML = data;
  return divElement.textContent;
}
