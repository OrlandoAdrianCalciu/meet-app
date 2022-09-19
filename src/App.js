import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from './EventGenre';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import WelcomeScreen from './WelcomeScreen';
import './nprogress.css';
import { OfflineAlert } from './Alert';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';




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

    getData = () => {
        const { locations, events } = this.state;
        const data = locations.map((location) => {
            const number = events.filter((event) => event.location === location).length
            const city = location.split(', ').shift()
            return { city, number };
        })
        return data;
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
                <h1>Meet App</h1>
                <h4>Choose your nearest city</h4>
                <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
                <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents} />
                <div className='data-vis-wrapper'>

                    <h4>Events in each city</h4>
                    <br></br>
                    <EventGenre events={this.state.events} />
                    <ResponsiveContainer height={400} >
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid />
                            <XAxis type="category" dataKey="city" name="city" />
                            <YAxis
                                allowDecimals={false}
                                type="number"
                                dataKey="number"
                                name="number of events"
                            />
                            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                            <Scatter data={this.getData()} fill="#8884d8" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
                <EventList events={this.state.events} />
            </div>
        );
    }
}

export default App;
