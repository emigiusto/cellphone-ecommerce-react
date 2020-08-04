import React, { Component } from 'react';

class Default extends Component {
    render() {
        console.log(this.props)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
                        <h1 className="display-3"> 404</h1>
                        <h1> error</h1>
                        <h2> PAGE NOT FOUND</h2>
                        <p>The requested url <span className="text-danger">{this.props.location.pathname}</span> was not found.<br></br> Please check your url direction.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Default;