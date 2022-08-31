Feature: Show/hide event details

Scenario: An event element is collapsed by default.
Given the App is not yet been opened
When user opens App
Then all event details should be collapsed
     
Scenario: User can expand an event to see its details.
Given user wants to know the details
When user clicks on event
Then details about the events should be shown
    
Scenario: User can collapse an event to hide its details.
Given user saw the details and wants to close it
When user clicks on event
Then details should collapse