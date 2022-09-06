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
        savedLocation: 'all',
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
                    location === 'all' ? events : events.filter((event) => event.location === location);
            }

            this.setState({
                events: locationEvents,
                numberOfEvents: eventCount,
                savedLocation: location,
            });
        });
    };

    render() {
        return (
            <div className="App">
                <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
                <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents} />
                <EventList events={this.state.events} />
            </div>
        );
    }
}

export default App;
