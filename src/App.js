import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import WelcomeScreen from './WelcomeScreen';
import './nprogress.css';
import { OfflineAlert } from './Alert';




class App extends Component {
    state = {
        events: [],
        locations: [],
        numberOfEvents: 32,
        savedLocation: 'all',
        showWelcomeScreen: undefined
    }

    async componentDidMount() { 
        this.mounted = true;
        const accessToken = localStorage.getItem("access_token");
        const isTokenValid = (await checkToken(accessToken)).error ? false : true;
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");
        this.setState({ showWelcomeScreen: !(code || isTokenValid) });
        if ((code || isTokenValid) && this.mounted) {
          getEvents().then((events) => {
            if (this.mounted) {
              let sliceNumber = this.state.numberOfEvents;
              this.setState({
                locations: extractLocations(events),
                events: events.slice(0, sliceNumber),
              });
            }
          });
        }
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
        if (this.state.showWelcomeScreen === undefined) return <div className='App' />
        return (
            <div className="App">
                <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => {
                    getAccessToken();
                }} />
                <div className='offlineAlert'>
                    {!navigator.onLine && (
                        <OfflineAlert text={"You are currently offline"} />
                    )}
                </div>
                <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
                <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents} />
                <EventList events={this.state.events} />
            </div>
        );
    }
}

export default App;
