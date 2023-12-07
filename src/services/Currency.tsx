import React from "react";
interface Prop {
  currency?: string;
  value: string | number;
}

function Currency(props: Prop) {
  var value = props.value;
  var currency = props.currency;
  const [result, setResult] = React.useState("");

  React.useEffect(() => {
    let vls = value;
    let curs = currency;
    vls = typeof vls !== "number" ? parseInt(vls) : vls;
    vls = vls.toFixed(2);
    vls = vls.toString();
    curs = curs ? curs : "₦";
    let resp = curs + vls.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setResult(resp);
  }, [currency, value]); //componentDidMount

  return <React.Fragment>{result}</React.Fragment>;
}

export default React.memo(Currency);
