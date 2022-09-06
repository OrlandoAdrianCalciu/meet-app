import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './nprogress.css';



class App extends Component {
    state = {
        events: [],
        locations: [],
        numberOfEvents: 32,
    }

    componentDidMount() {
        this.mounted = true;
        getEvents().then((events) => {
            if (this.mounted) {
                this.setState({ events, locations: extractLocations(events) });
            }
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    updateEvents = (location, eventCount) => {
        getEvents().then((events) => {
            let locationEvents;
            if (location === undefined) {
                locationEvents = events.slice(0, eventCount);
            } else if (eventCount === undefined) {
                locationEvents =
                    location === 'all'
                        ? events.slice(0, eventCount)
                        : events.filter((event) => event.location === location).slice(0, eventCount);
            }

            this.setState({
                events: locationEvents.slice(0, this.state.numberOfEvents),
                numberOfEvents: eventCount,
            });
        });
    };

    render() {
        return (
            <div className="App">
                <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
                <NumberOfEvents numberOfEvents={numberOfEvents} updateEvents={this.updateEvents} />
                <EventList events={this.state.events} />
            </div>
        );
    }
}

export default App;
