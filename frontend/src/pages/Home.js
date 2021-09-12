// import logo from './logo.svg';
import React from "react";

// class Home extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLogginActive: true
//     }
//   }

//   render() {
//     const {isLogginActive} = this.state;
//     return(
//       <div className="Home">
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

function Home() {
  return (
    <div>
      <p>Welcome to Foodify.us Home page!</p>
    </div>
  );
}

export default Home;
