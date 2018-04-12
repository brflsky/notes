import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import moment from 'moment';
import { mount } from 'enzyme';
import { NoteListItem } from './NoteListItem';

if (Meteor.isClient) {
  describe('NoteListItem', () => {
    it('should render NoteListItem', () => {
      const note = {
        title: 'test title',
        createdAt: moment()
      };
      const wrapper = mount(<NoteListItem note={note} />);
      expect(wrapper.find('h5').text().trim()).toBe(note.title);
      expect(wrapper.find('p').text().trim()).toBe(moment(note.createdAt).format('DD-MM-YYYY'));
    });
  });
}

