import React, { useState } from 'react';

const Square = ({ value }) => {

    let [innerValue, setInnerValue] = useState(null);

    return (
        <>
            <button
                className="square"
                onClick={() => setInnerValue(value)}
            >
                {innerValue}
            </button>
        </>
    );

};

export default Square;