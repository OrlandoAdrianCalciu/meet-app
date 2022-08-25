import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

    test('render number input', () => {
        expect(NumberOfEventsWrapper.find('.number-input')).toHaveLength(1);
    });
    test('render default number', () => {
        expect(NumberOfEventsWrapper.find('.number-input').prop('value')).toBe(32);
    });
    test('render change number', () => {
        NumberOfEventsWrapper.setState({
            numberOfEvents: 32
        });
        const eventObject = { target: { value: 10 } };
        NumberOfEventsWrapper.find('.number-input').simulate('change', eventObject);
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(10);
    });
});