import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Editor } from './Editor';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {
  describe('Editor', () => {
    let Session;
    let call;
    beforeEach(() => {
      Session = {
        set: expect.createSpy()
      };
      call = expect.createSpy();
    });
    it('should display "Not not found"', () => {
      const wrapper = mount(<Editor selectedNoteId="dummyId" Session={Session} call={call} />);
      expect(wrapper.find('p').text()).toBe('Note not found');
    });
    it('should display "Pick or create a note"', () => {
      const wrapper = mount(<Editor Session={{}} call={call} />);
      expect(wrapper.find('p').text()).toBe('Pick or create a note');
    });
    it('should remove choosen note after button clicking', () => {
      const wrapper = mount(<Editor selectedNoteId={notes[0]._id} note={notes[0]} Session={Session} call={call} />);
      wrapper.find('button').simulate('click');
      expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', '');
    });
    it('should update the notes body on text area change', () => {
      const value = 'New body value';
      const wrapper = mount(<Editor selectedNoteId={notes[0]._id} note={notes[0]} Session={Session} call={call} />);

      wrapper.find('textarea').simulate('change', {
        target: {
          value
        }
      });
      expect(wrapper.state('body')).toEqual(value);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { body: value });
    });
    it('should update the notes title input change', () => {
      const value = 'New title value';
      const wrapper = mount(<Editor selectedNoteId={notes[0]._id} note={notes[0]} Session={Session} call={call} />);

      wrapper.find('input').simulate('change', {
        target: {
          value
        }
      });
      expect(wrapper.state('title')).toEqual(value);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { title: value });
    });

    it('should set state for new note', () => {
      const wrapper = mount(<Editor Session={Session} call={call} />);

      wrapper.setProps({
        selectedNoteId: notes[0]._id,
        note: notes[0]
      });

      expect(wrapper.state()).toEqual({
        body: notes[0].body,
        title: notes[0].title
      });
    });
    it('should not set state if note prop not provided', () => {
      const wrapper = mount(<Editor Session={Session} call={call} />);

      wrapper.setProps({
        selectedNoteId: notes[0]._id
      });

      expect(wrapper.state()).toEqual({
        body: '',
        title: ''
      });
    });
  });
}
