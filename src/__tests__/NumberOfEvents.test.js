import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => { }} />);
    });

    test('render numberOfEvents div', () => {
        expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
    });
    test('render number label', () => {
        expect(NumberOfEventsWrapper.find('.number-label')).toHaveLength(1);
    });
    test('render number input', () => {
        expect(NumberOfEventsWrapper.find('.number-input')).toHaveLength(1);
    });
    test('render default number', () => {
        expect(NumberOfEventsWrapper.find('.number-input').prop('value')).toBe(32);
    });
    test('render change number', () => {
        NumberOfEventsWrapper.find('.number-input').simulate('change', {
            target: { value: 5 },
        });
        expect(NumberOfEventsWrapper.find('.number-input').prop('value')).toBe(5);
    });
});