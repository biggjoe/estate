const HeaderSearch = (props: any) => {
  const {
    loaded,
    loading,
    searchProperties,
    resetSearch,
    search,
    handleInputChange,
  } = props;
  return (
    <>
      <div className="search-space top">
        <span className="s-bar">
          <input
            type="text"
            name="keyword"
            value={search.keyword}
            onChange={handleInputChange}
            placeholder="Search properties"
            className="header-searcher"
          />
          {!loaded && (
            <>
              <button
                onClick={searchProperties}
                className="header-searcher-button"
              >
                {loading ? (
                  <i className="fas fa-spin fa-circle-notch"></i>
                ) : (
                  <i className="fas fa-search"></i>
                )}
              </button>
            </>
          )}
          {loaded && (
            <>
              <button
                onClick={resetSearch}
                className="header-searcher-button closer"
              >
                <i className="fas  fa-close"></i>
              </button>
            </>
          )}
        </span>
      </div>
    </>
  );
};

export default HeaderSearch;
