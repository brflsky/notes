import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import moment from 'moment';
import { mount } from 'enzyme';
import { NoteListItem } from './NoteListItem';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {
  describe('NoteListItem', () => {
    let Session;
    let wrapper;
    beforeEach(() => {
      Session = {
        set: expect.createSpy()
      };
      wrapper = mount(<NoteListItem note={notes[0]} Session={Session} />);
    });
    it('should render NoteListItem', () => {
      expect(wrapper.find('h5').text().trim()).toBe(notes[0].title);
      expect(wrapper.find('p').text().trim()).toBe('12-04-2018');
    });

    it('should call Session.set() on click', () => {
      wrapper.find('div').simulate('click');
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
    });
  });
}

