import React from 'react'

const Button = ({ clickFunc, cssid, buttonName }) => {
    return (
        <div>
            <button
                onClick={clickFunc}
                id={cssid}
            >
                {buttonName}
            </button>
        </div>
    )
}

export default Button