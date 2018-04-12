import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';

const renderNotes = (notes) => {
      return notes.map(note => <NoteListItem key={note._id} note={note} />);
};

export const NoteList = (props) => {
  return (
    <div>
      <div>Note List {props.notes.length}</div>
      <NoteListHeader />
      {renderNotes(props.notes)}
    </div>
  );
};

NoteList.propTypes = {
  notes: React.PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('notes');

  return {
    notes: Notes.find().fetch()
  };
}, NoteList);
