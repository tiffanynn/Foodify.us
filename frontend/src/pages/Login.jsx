import React from 'react';

// export class Login extends React.Component {

//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
            // <div className="base-container" ref={this.props.containerRef}>
            //     <h1>Login</h1>
            //     <div className="content">
            //         <div className="form">
            //             <div className="form-group">
            //                 <label htmlFor="email">Email</label>
            //                 <input type="text" name="email" placeholder="Email"></input>
            //             </div>
            //             <div className="form-group">
            //                 <label htmlFor="password">Password</label>
            //                 <input type="text" name="password" placeholder="Password"></input>
            //             </div>
            //         </div>
            //     </div>
            //     <div className="sumbit">
            //         <button type="button" className="btn">Login</button>
            //     </div>
            // </div>
//         );
//     }


// }

function Login(){
    return (
        <div className="base-container" ref={this.props.containerRef}>
            <h1>Login</h1>
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
                <button type="button" className="btn">Login</button>
            </div>
        </div>
    );
}

export default Login;