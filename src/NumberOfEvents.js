import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

export class NumberOfEvents extends Component {
    state = { 
        numberOfEvents: 32,
        infoText: '',
    };

    handleInputChanged = (event) => {
        const value = event.target.value;
        if (value >= 33 || value <= 0) {
            this.setState({
                numberOfEvents: value,
                infoText: 'Please enter a number between 1 - 32',
            });
        } else {
            this.setState({
                numberOfEvents: value,
                infoText: '',
            });
        }

        this.props.updateEvents(undefined, value);
    };

    render() {
        return (
            <div className="numberOfEvents"> 
            <label className="number-label">Number of Events:</label>
            <br></br>
                <input 
                type='number'
                className="number-input"
                value={this.state.numberOfEvents}
                onChange={this.handleInputChanged}
                />
                <ErrorAlert text={this.setState.infoText} />
            </div>
        );
    }
}

export default NumberOfEvents;