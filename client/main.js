import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivace = Session.get('currentPagePrivace');

  onAuthChange(isAuthenticated, currentPagePrivace);
});

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  if (selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`);
  }
});



Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  ReactDOM.render(routes, document.getElementById('app'));
});
