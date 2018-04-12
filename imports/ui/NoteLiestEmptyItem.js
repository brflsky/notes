import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

const NoteListEmptyItem = (props) => {
  return (
    <div>
      <h5>You dont have any note</h5>
      <p>Add one to start</p>
    </div>
  );
};

export default NoteListEmptyItem;
