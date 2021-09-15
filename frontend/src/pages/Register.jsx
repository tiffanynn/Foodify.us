import React, {useContext} from 'react';

export class Register extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <h1>Let's start a food journey</h1>
                <div className="content"> 
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" placeholder="Email"></input>   
                        </div>    
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" name="password" placeholder="Password"></input>
                        </div>
                    </div> 
                </div>
                <div className="sumbit">
                    <button type="button" className="btn">Register</button>
                </div>
            </div>
        );
    }


}

// function Register(){
//     return(
//         <div className="base-container" ref={this.props.containerRef}>
//             <h1>Register</h1>
//             <div className="content">
//                 <div className="form">
//                     <div className="form-group">
//                         <label htmlFor="email">Email</label>
//                         <input type="text" name="email" placeholder="Email"></input>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="password">Password</label>
//                         <input type="text" name="password" placeholder="Password"></input>
//                     </div>
//                 </div>
//             </div>
//             <div className="sumbit">
//                 <button type="button" className="btn">Register</button>
//             </div>
//         </div>
//     );
// }

export default Register;