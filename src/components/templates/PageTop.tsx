const PageTop = (props: any) => {
  const { h2, sub, type } = props;
  return (
    <>
      <section
        className={type && type === "medium" ? "page-top" : "page-top-mini"}
      >
        <div className="page-top-art">
          <div className="push-bar"></div>
          <div className="blue-bar"></div>
          <div className="red-bar"></div>
          <div className="sky-bar"></div>
        </div>
        <div className="container flex align-items-center z-high">
          <div className="page-info">
            {h2 && <h2>{h2}</h2>}
            {sub && <p>{sub}</p>}
          </div>
        </div>
      </section>
    </>
  );
};

export default PageTop;
