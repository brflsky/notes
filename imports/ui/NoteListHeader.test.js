import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
// import moment from 'moment';
import { mount } from 'enzyme';
import { NoteListHeader } from './NoteListHeader';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {
  let meteorCall;
  let Session;
  beforeEach(() => {
    meteorCall = expect.createSpy();
    Session = { set: expect.createSpy() };
  });
  describe('NoteListHeader', function () {
    it('should call insert.note after clicking a buuton', () => {
      const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session} />);
      wrapper.find('button').simulate('click');
      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
      meteorCall.calls[0].arguments[1](undefined, notes[0]._id);
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
    });

    it('should not set session for faild insert', () => {
      const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session} />);
      wrapper.find('button').simulate('click');
      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
      meteorCall.calls[0].arguments[1]({});
      expect(Session.set).toNotHaveBeenCalled();
    });
  });
}
