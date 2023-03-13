import React from "react";

function ShowSection(props) { //props.finalDisplayTemplate //props.submitted

    if (props.finalDisplayTemplate && props.submitted === true) {
        return (
            <div className="show-section" dangerouslySetInnerHTML={{__html: props.finalDisplayTemplate}}></div>
        )
    } else if (!props.finalDisplayTemplate && props.submitted === true) {
        return (
            <div className="show-section">
                <div className="show-section-inner">
                    {/* <img className="query-img" src="queryimg.png"></img> */}
                    <span className="span-query-noblink">No results for this query!</span>
                </div>
            </div>
        )
    } else if (!props.finalDisplayTemplate && props.submitted === false) {
        return (
            <div className="show-section">
                <div className="show-section-inner">
                <span className="span-query-title">TV SERIES</span>
                <span className="span-query-description">SEARCH ENGINE</span>
                    {/* <img className="query-img" src="queryimg.png"></img> */}
                    <span className="span-query">Waiting for your query!</span>
                </div>
            </div>
        )
    }

}



export default ShowSection