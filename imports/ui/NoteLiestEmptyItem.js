import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

const NoteListEmptyItem = (props) => {
  return (
    <p className="empty-item">Add note to start</p>
  );
};

export default NoteListEmptyItem;
