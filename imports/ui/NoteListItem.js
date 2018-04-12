import React from 'react';
import moment from 'moment';

export const NoteListItem = (props) => {
  return (
    <div>
      <h5>{props.note.title || 'Untitled Note'} </h5>
      <p>{moment(props.note.createdAt).format('DD-MM-YYYY')}</p>
    </div>
  );
};

NoteListItem.propTypes = {
  note: React.PropTypes.object.isRequired
};

export default NoteListItem;
