import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Notes } from '../api/notes';

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
  }
  componentDidUpdate(prevProps, prevState) {
    const currNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;
    if (currNoteId && currNoteId !== prevNoteId) {
      this.setState({ title: this.props.note.title, body: this.props.note.body });
    }
  }
  handlerBodyOnChange = (e) => {
    this.setState({ body: e.target.value });
    this.props.call('notes.update', this.props.selectedNoteId, { body: e.target.value });
  }
  handlerTitleOnChange = (e) => {
    this.setState({ title: e.target.value });
    this.props.call('notes.update', this.props.selectedNoteId, { title: e.target.value });
  }
  handlerNoteRemove = () => {
    this.props.call('notes.remove', this.props.selectedNoteId);
    this.props.Session.set('selectedNoteId', '');
  }
  render() {
    if (this.props.note) {
      return (
        <div className="editor">
          <input value={this.state.title} ref="title" placeholder="Note's title goes here" onChange={this.handlerTitleOnChange} />
          <textarea value={this.state.body} ref="body" placeholder="Your note goes here" onChange={this.handlerBodyOnChange} />
          <button onClick={this.handlerNoteRemove}>X</button>
        </div>
      );
    } else if (this.props.selectedNoteId) {
      return (
        <div className="editor">
          <p>Note not found</p>;
        </div>
      );
    }

    return <p>Pick or create a note</p>;
  }
}

Editor.propTypes = {
  note: React.PropTypes.object,
  selectedNoteId: React.PropTypes.string,
  call: React.PropTypes.func.isRequired,
  Session: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  return {
    selectedNoteId,
    note: Notes.findOne({ _id: selectedNoteId }),
    call: Meteor.call,
    Session
  };
}, Editor);

