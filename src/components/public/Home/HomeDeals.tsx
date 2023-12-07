import React from "react";
import useFetchDeals from "../../../hooks/useFetchDeals";
import DealsListTemplate from "../../templates/DealsListTemplate";

const HomeDeals = (props: any) => {
  const { deals, loaded, loading } = useFetchDeals({
    mode: "all-deals",
  });

  console.log(deals);
  return (
    <React.Fragment>
      <div className="page-bgd">
        {deals.map((item) => (
          <DealsListTemplate
            key={item.id}
            deals={item}
            loaded={loaded}
            loading={loading}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default HomeDeals;
