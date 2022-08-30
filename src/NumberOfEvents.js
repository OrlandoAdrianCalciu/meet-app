import React, { Component } from "react";

export class NumberOfEvents extends Component {
    state = { numberOfEvents: 32 };

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({ numberOfEvents: value });
    };

    render() {
        return (
            <div className="numberofEvents"> 
            <br></br>
            <label>Number of Events:</label>
                <input 
                type='number'
                className="number-input"
                value={this.state.numberOfEvents}
                onChange={this.handleInputChanged}
                />
            </div>
        );
    }
}

export default NumberOfEvents;