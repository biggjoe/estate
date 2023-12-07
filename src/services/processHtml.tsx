const decodeHtml = (html: string) => {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const truncateWord = (
  str: string,
  n: number,
  useWordBoundary: boolean = true
) => {
  if (str.length <= n) {
    return str;
  }
  const subString = str.slice(0, n - 1); // the original check
  return (
    (useWordBoundary
      ? subString.slice(0, subString.lastIndexOf(" "))
      : subString) + "..."
  );
};

export { truncateWord, decodeHtml };
