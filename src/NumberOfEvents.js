import React, { Component } from "react";

export class NumberOfEvents extends Component {
    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({ numberOfEvents: value });
    };

    state = { numberOfEvents: 32 };

    render() {
        return (
            <div className="numberofEvents">
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