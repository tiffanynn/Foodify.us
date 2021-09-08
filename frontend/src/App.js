// import logo from './logo.svg';
import './App.css';
import {Login, Register} from "./pages";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
    }
  }

  render() {
    const {isLogginActive} = this.state;
    return(
      <div className="App">
        <div className="Login">
          <div className="container">
            {isLogginActive && <Login containerRef={(ref) => this.current = ref}/>}
            {!isLogginActive && <Register containerRef={(ref) => this.current = ref}/>}
          </div>
        </div>
      </div>
    )
  }
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Welcome to Foodify.us Home page!
        </p>
      </header>
    </div>
  );
}

export default App;
