import React, { useEffect, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";

import SearchBar from "material-ui-search-bar";

const SearchAreaBoxStyle = {
  height: "auto",
  padding: "25px",
  backgroundColor: "#c7f4e2",
};
const SearchBarStyle = {
  width: "500px",
};

function SearchArea() {
  let [searchBarText, setSearchBarText] = useState(""); // recipeStateData Initialized to Null
  let [fetchingResults, setFetchingResults] = useState(false);
  const history = useHistory();
  function newSearch(searchValue) {
    console.log("NEW SEARCH: ", searchValue);
    var encodedSearchValue = encodeURIComponent(searchValue);
    history.push(`/search/${encodedSearchValue}`);

    //Fetches Recipe Data From API (After Component Is Rendered),
    //Saves Data to State using 'setRecipeStateData'
    /* useEffect(() => {
    fetch("http://localhost:5000/feed")
      .then((response) => response.json())
      // Setting recipe Data to the data that we received from the response above
      .then((data) => {
        console.log("RECIEVED API RESPONSE RECIPE DATA: ", data);
        setRecipeStateData(data);
      });
  }, []); */
  }

  return (
    <div style={SearchAreaBoxStyle}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <SearchBar
            style={SearchBarStyle}
            value={searchBarText}
            onChange={(newValue) => setSearchBarText(newValue)}
            onRequestSearch={() => newSearch(searchBarText)}
          />
          {fetchingResults && <LinearProgress />}
        </Grid>
      </Grid>
    </div>
  );
}

export default SearchArea;
