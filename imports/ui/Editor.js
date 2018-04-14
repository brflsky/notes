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
          <input className="editor__title" value={this.state.title} ref="title" placeholder="Note's title goes here" onChange={this.handlerTitleOnChange} />
          <textarea className="editor__body" value={this.state.body} ref="body" placeholder="Your note goes here" onChange={this.handlerBodyOnChange} />
          <div>
            <button className="button button--secondary" onClick={this.handlerNoteRemove}>Delete Note</button>
          </div>
        </div>
      );
    } else if (this.props.selectedNoteId) {
      return (
        <div className="editor">
          <p className="editor__message">Note not found</p>
        </div>
      );
    }

    return <div className="editor"><p className="editor__message">Pick or create a note</p></div>;
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

