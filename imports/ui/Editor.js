import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Notes } from '../api/notes';

export class Editor extends React.Component {
  handlerBodyOnChange = (e) => {
    this.props.call('notes.update', this.props.selectedNoteId, { body: e.target.value });
  }
  handlerTitleOnChange = (e) => {
    this.props.call('notes.update', this.props.selectedNoteId, { title: e.target.value });
  }
  handlerNoteRemove = () => {
    this.props.call('notes.remove', this.props.selectedNoteId);
    Session.set('selectedNoteId', '');
  }
  render() {
    if (this.props.note) {
      return (
        <div>
          <input value={this.props.note.title} placeholder="Note's title goes here" onChange={this.handlerTitleOnChange} />
          <textarea value={this.props.note.body} placeholder="Your note goes here" onChange={this.handlerBodyOnChange} />
          <button onClick={this.handlerNoteRemove}>X</button>
        </div>
      );
    } else if (this.props.selectedNoteId) {
      return <p>Note not found</p>;
    }

    return <p>Pick or create a note</p>;
  }
}

Editor.propTypes = {
  note: React.PropTypes.object,
  selectedNoteId: React.PropTypes.string,
  call: React.PropTypes.func.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  return {
    selectedNoteId,
    note: Notes.findOne({ _id: selectedNoteId }),
    call: Meteor.call
  };
}, Editor);

