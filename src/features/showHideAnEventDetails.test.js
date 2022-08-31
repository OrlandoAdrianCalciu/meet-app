import { mount } from "enzyme";
import React from "react";
import { loadFeature, defineFeature } from "jest-cucumber";
import App from "../App";

const feature = loadFeature('./src/features/showHideAnEventDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default.', ({ given, when, then }) => {
        given('the App is not yet been opened', () => {

        });

        let AppWrapper;
        when('user opens App', () => {
            AppWrapper = mount(<App />);
        });

        then('all event details should be collapsed', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event .event-details')).toHaveLength(0);
        });
    });

    test('User can expand an event to see its details.', ({ given, when, then }) => {
        let AppWrapper;
        given('user wants to know the details', () => {
            AppWrapper = mount(<App />)
        });

        when('user clicks on event', () => {
            AppWrapper.update();
            AppWrapper.find('.event .event-showDetails-btn').at(0).simulate('click');
        });

        then('details about the events should be shown', () => {
            expect(AppWrapper.find('.event .event-about-title')).toHaveLength(1);
        });
    });

    test('User can collapse an event to hide its details.', ({ given, when, then }) => {
        let AppWrapper;
        given('user saw the details and wants to close it', async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.update();
            AppWrapper.find('.event .event-showDetails-btn').at(0).simulate('click');
        });

        when('user clicks on event', () => {
            AppWrapper.update();
            AppWrapper.find('.event .event-showDetails-btn').at(0).simulate('click');
        });

        then('details should collapse', () => {
            expect(AppWrapper.find('.event .event-details')).toHaveLength(0);
        });
    });
});