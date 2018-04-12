import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { NoteList } from './NoteList';
import { notes } from '../fixtures/fixtures';



if (Meteor.isClient) {
  describe('NoteList', () => {
    it('should generate NoteListItem for each note ', () => {
      const wrapper = mount(<NoteList notes={notes} />);
      expect(wrapper.find('NoteListItem').length).toBe(2);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
    });

    it('should generate NoteListEmptyItem when notes list is empty', () => {
      const wrapper = mount(<NoteList notes={[]} />);
      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
    });
  });
}
