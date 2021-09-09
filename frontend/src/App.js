// import logo from './logo.svg';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Login, Register, Navigation, Footer } from "./pages";
import './App.css';


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
//         <div className="Login">
//           <div className="container">
//             {isLogginActive && <Login containerRef={(ref) => this.current = ref}/>}
//             {!isLogginActive && <Register containerRef={(ref) => this.current = ref}/>}
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Welcome to Foodify.us Home page!
        </p>
      </header>
      <Router>
        <Navigation />
        <Switch> 
          <Route path="/register" exact component={() => <Register />} />
          <Route path="/login" exact component={() => <Login />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
