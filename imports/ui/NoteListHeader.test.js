import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
// import moment from 'moment';
import { mount } from 'enzyme';
import { NoteListHeader } from './NoteListHeader';

if (Meteor.isClient) {
  describe('NoteListHeader', function () {
    it('should call insert.note after clicking a buuton', () => {
      const spy = expect.createSpy();
      const wrapper = mount(<NoteListHeader meteorCall={spy} />);
      wrapper.find('button').simulate('click');
      expect(spy.calls[0].arguments[0]).toBe('notes.insert');
    });
  });
}
