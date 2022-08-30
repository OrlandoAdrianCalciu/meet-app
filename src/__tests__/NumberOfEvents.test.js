import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}}/>);
    });

    test('render number input', () => {
        expect(NumberOfEventsWrapper.find('.number-input')).toHaveLength(1);
    });
    test('render default number', () => {
        expect(NumberOfEventsWrapper.find('.number-input').prop('value')).toEqual(32);
    });
    test('render change number', () => {
        NumberOfEventsWrapper.setState({
            numberOfEvents: 10
        });
        const eventObject = { target: { value: 5 } };
        NumberOfEventsWrapper.find('.number-input').simulate('change', eventObject);
        expect(NumberOfEventsWrapper.state('numberOfEvents')).not.toEqual(undefined);
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(5);
    });
});