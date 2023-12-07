function capStr(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export default function makeForm(props: any) {
  const { key, type, value, options = [] } = props;

  const kxy = key.replace(/nok/g, "next of kin");
  const spl = kxy.split("_");
  const ky = capStr(spl.join(" "));

  if (
    type === "text" ||
    type === "number" ||
    type === "email" ||
    type === "hidden"
  ) {
    return { key: key, label: `${ky}`, type: type, value: value };
  } else if (type === "select") {
    let iloop = [];
    for (let i = 0; i < options.length; i++) {
      iloop.push({ label: i, value: i });
    }

    return {
      key: key,
      label: `${ky}`,
      type: type,
      value: value,
      options: iloop,
    };
  }
}
