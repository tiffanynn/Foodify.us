// import logo from './logo.svg';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Login, Register, Navigation, Footer } from "./pages";
import SearchResults from "./pages/SearchResults";
import ProfileSearchResults from "./pages/ProfileSearchResults";

import Recipe from "./pages/Recipes/Recipes.js";
import { AuthProvider } from "./config/Authentication.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Profile from "./pages/Profile";
import UploadRecipe from "./pages/Recipes/Upload/Upload";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <AuthProvider>
        <Router>
          <Navigation />
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/register" exact component={() => <Register />} />
            <Route path="/login" exact component={() => <Login />} />
            <Route path="/profile" exact component={() => <Profile />} />
            <Route path="/recipe" exact component={() => <Recipe />} />
            <Route path="/upload" exact component={() => <UploadRecipe />} />
            <Route path="/recipe/:urlRecipeId" component={() => <Recipe />} />
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

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLogginActive: true
//     }
//   }

//   render() {
//     const {isLogginActive} = this.state;
//     return(
//       <div className="App">
// <div className="Login">
//   <div className="container">
//     {isLogginActive && <Login containerRef={(ref) => this.current = ref}/>}
//     {!isLogginActive && <Register containerRef={(ref) => this.current = ref}/>}
//   </div>
// </div>
//       </div>
//     )
//   }
// }
