// import logo from './logo.svg';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./pages";
import Register from "./pages/UserAuth/Register";
import Login from "./pages/UserAuth/Login";
import Footer from "./pages/Sections/Footer";
import Navigation2 from "./pages/Sections/Navigation2";

import SearchResults from "./pages/SearchResults";
import ProfileSearchResults from "./pages/ProfileSearchResults";

import Recipe from "./pages/Recipes/Recipes.js";
import { AuthProvider } from "./config/Authentication.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import UploadRecipe from "./pages/Recipes/Upload/Upload";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navigation2 />
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/register" exact component={() => <Register />} />
            <Route path="/login" exact component={() => <Login />} />
            <Route path="/profile" exact component={() => <Profile />} />
            <Route path="/recipe" exact component={() => <Recipe />} />
            <Route path="/upload" exact component={() => <UploadRecipe />} />
            <Route path="/recipe/:urlRecipeId" component={() => <Recipe />} />
            <Route path ="/profile/:userName" component={ () => <UserProfile /> } />
            <Route
              path="/edit-profile"
              exact
              component={() => <EditProfile />}
            />
            <Route
              path="/search/:urlSearchValue"
              component={() => <SearchResults />}
            />
            <Route
              path="/searchuser/:urlSearchValue"
              component={() => <ProfileSearchResults />}
            />
          </Switch>
        </Router>
      </AuthProvider>
      {/* </header> */}
      <Footer />
    </div>
  );
}

export default App;
