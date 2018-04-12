import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { NoteList } from './NoteList';



if (Meteor.isClient) {
  const notes = [
    {
      _id: 'noteId1',
      title: 'Note Title 1',
      body: 'Note body 1',
      userId: 'userId1'
    },
    {
      _id: 'noteId2',
      title: 'Note Title 2',
      body: 'Note body 2',
      userId: 'userId2'
    }
  ];

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
