import React, { useEffect, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { Container, Button, Row, Col, Form } from "react-bootstrap";

import SearchBar from "material-ui-search-bar";

const SearchAreaBoxStyle = {
  height: "auto",
  padding: "25px",
  backgroundColor: "#c7f4e2",
};
const SearchBarStyle = {
  width: "500px",
};
const tags = [
  "vegan",
  "keto friendly",
  "paleo",
  "atkins",
  "calorie lite",
  "pescatarian",
  "vegetarian",
];
function SearchArea() {
  let [searchBarText, setSearchBarText] = useState(""); // recipeStateData Initialized to Null
  //let [dietTags, setDietTags] = useState(["", "", "", "", ""]);
  let [fetchingResults, setFetchingResults] = useState(false);
  let [selectedTags, setTags] = useState([]);
  let [profileSearchSelected, setProfileSearchSelected] = useState(false);
  const history = useHistory();

  const changeTag = (tag) => {
    var temp = [...selectedTags];
    if (temp.includes(tag)) {
      var index = temp.indexOf(tag);
      temp.splice(index, 1);
      setTags(temp);
    } else {
      temp.push(tag);
      setTags(temp);
    }
  };

  function newSearch(searchValue) {
    console.log("NEW SEARCH: ", searchValue);
    var encodedSearchValue = encodeURIComponent(searchValue);

    if (!profileSearchSelected) {
      var dietTagParams = "dietTags=" + selectedTags.join("&dietTags=");
      //var dietTagParams = "test";
      //console.log(`/search/${encodedSearchValue}/${dietTagParams}`);
      // history.push(`/search/${encodedSearchValue}/${dietTagParams}`);

      console.log(`/search/query=${encodedSearchValue}&${dietTagParams}`);
      history.push(`/search/query=${encodedSearchValue}&${dietTagParams}`);
    } else {
      console.log("PROFILE SEARCH");
      console.log(`/searchuser/query=${encodedSearchValue}&${dietTagParams}`);
      history.push(`/searchuser/query=${encodedSearchValue}&${dietTagParams}`);
    }

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
      <Grid container justifyContent="center">
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          xs={12}
        >
          <SearchBar
            style={SearchBarStyle}
            value={searchBarText}
            onChange={(newValue) => setSearchBarText(newValue)}
            onRequestSearch={() => newSearch(searchBarText)}
          />
        </Grid>
        <Grid
          container
          style={{}}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={0.5}
          item
        >
          <Grid
            item
            container
            direction="row"
            justifyContent="left"
            alignItems="left"
            style={{
              maxWidth: "50%",
            }}
          >
            <Grid item xs={2.5}></Grid>
            <Grid item xs={profileSearchSelected ? 12 : 2.5}>
              <Button
                key={10}
                variant="outlined"
                id={profileSearchSelected ? "selected" : "outlined"}
                className="tag"
                onClick={() => {
                  setProfileSearchSelected(!profileSearchSelected);
                }}
              >
                {profileSearchSelected
                  ? " ⓧ Showing only profiles"
                  : "Show only profiles"}
              </Button>
            </Grid>
            {tags.map((item, index) => {
              if (selectedTags.includes(item)) {
                return (
                  !profileSearchSelected && (
                    <Grid className="dietTag" item xs={3}>
                      <Button
                        key={index}
                        variant="outlined"
                        id="selected"
                        className="tag"
                        onClick={() => changeTag(item)}
                      >
                        {" ⓧ " + item}
                      </Button>
                    </Grid>
                  )
                );
              } else {
                return (
                  !profileSearchSelected && (
                    <Grid className="dietTag" item xs={3}>
                      <Button
                        key={index}
                        variant="outlined"
                        id="outlined"
                        className="tag"
                        onClick={() => {
                          changeTag(item);
                        }}
                      >
                        {item}
                      </Button>
                    </Grid>
                  )
                );
              }
            })}
          </Grid>

          {fetchingResults && <LinearProgress />}
        </Grid>
      </Grid>
    </div>
  );
}

export default SearchArea;
