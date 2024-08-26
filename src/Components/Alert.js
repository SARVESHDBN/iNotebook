import React from 'react'

const Alert = (props) => {
    return (
        <div> 
            <div className="alert alert-info" role="alert">
                {/* A simple info alert with <a href="/" className="alert-link">an example link</a>. 
                Give it a click if you like. */}
                {props.message}
            </div>
        </div>
    )
}

export default Alert
