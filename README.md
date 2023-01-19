## Meet-app

## Description

This is a serverless, PWA app built using the TDD process. It's main purpose is to show users events by city. It uses the Google Calendar API.

##Demo

-Demo Site URL: [Meet-App](https://orlandoadriancalciu.github.io/meet-app/)


## Feature 1: Filter events by city

As a user, I would like to be able to filter events by city so that I can see the list of events that take place in that city.

- Scenario I: 
    - Given : User hasn't searched for a city
    - When : User opens app
    - Then : User should see upcoming events from all cities

- Scenario II: 
    - Given : User opens main page
    - When : User starts typing
    - Then : User should see a list of suggestions (cities)
    
- Scenario III: 
    - Given : User was typing "Berlin" in the city textbox and the list of suggested cities is showing
    - When : User selects a city ("Berlin, Germany") from the list
    - Then : their city should be changed to that city ("Berlin, Germany") and the user should receive a list of upcoming events in that city
    
## Feature 2: Show/hide event details

As a user, I would like to be able to show/hide event details so that I can see more/less information about an event.

- Scenario I:
    - Given : The App is not yet been opened
    - When : User opens App
    - Then : All event details should be collapsed
     
- Scenario II: 
    - Given : User wants to know the details
    - When : User clicks on event
    - Then : Details about the events should be shown
    
- Scenario III: 
    - Given : User saw the details and wants to close it
    - When : User clicks on event
    - Then : Details should collapse
    
## Feature 3: Specify number of events

As a user, I would like to be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once.

- Scenario I:
    - Given : User haven't specified a number of events
    - When : User opens App
    - Then : As default 32 events should be shown
    
- Scenario II: 
    - Given : User have specified a number of events
    - When : User opens App
    - Then : The specified number of events should be shown
    
## Feature 4: Use the app when offline

As a user, I would like to be able to use the app when offline so that I can see the events I viewed the last time I was online.

- Scenario I:
    - Given : User has no internet
    - When : User opens App
    - Then : Cached data from last usage should be shown
    
- Scenario II: 
    - Given : User has no internet
    - When : User wants to change the city
    - Then : Error message
    
## Feature 5: Add an app shortcut to the home screen

As a user, I would like to be able to add the app shortcut to my home screen so that I can open the app faster.

- Scenario I:
    - Given : User opens main page
    - When : User wants to see events for that city
    - Then : User will see a chart with upcoming events
