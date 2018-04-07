import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { Notes } from './notes';
// import moment from 'moment';

if (Meteor.isServer) {
  describe('notes', function () {
    const noteOne = {
      _id: 'testNoteId1',
      title: 'my title',
      body: 'my body for note',
      updatedAt: 0,
      userId: 'testUserId1'
    };
    const noteTwo = {
      _id: 'testNoteId2',
      title: 'my title 2',
      body: 'my body for note 2',
      updatedAt: 1,
      userId: 'testUserId2'
    };

    beforeEach(function () {
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    it('should insert new note', function () {
      const userId = 'testID';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });
      expect(Notes.findOne({ _id, userId })).toExist();
    });

    it('should not insert a note with no userId', function () {
      expect(() => { Meteor.server.method_handlers['notes.insert'].apply({}); }).toThrow();
    });

    it('should remove note', function () {
      Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id]);

      expect(Notes.findOne({ _id: noteOne._id })).toNotExist();
    });

    it('should not remove note when user not auth.', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not remove note when _id is not valid', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, ['']);
      }).toThrow();
    });

    it('should update note', () => {
      Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId }, [noteOne._id, { title: 'new test title' }]);
      const note = Notes.findOne({ _id: noteOne._id });
      expect(note.title).toEqual('new test title');
      expect(note.updatedAt).toBeGreaterThan(0);
    });

    it('should throw error if extra data are passed', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.update']
          .apply({ userId: noteOne.userId }, [noteOne._id, { title: 'new test title', car: 'car' }]);
      }).toThrow();
    });

    it('should not update note when user was not creator', () => {
      Meteor.server.method_handlers['notes.update'].apply({ userId: 'wrongID' }, [noteOne._id, { title: 'new test title' }]);
      const note = Notes.findOne({ _id: noteOne._id });
      expect(note.title).toEqual(noteOne.title);
      expect(note.updatedAt).toBe(0);
    });

    it('should not update note when user not auth.', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not update note when _id is not valid', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, ['', { title: 'new test title' }]);
      }).toThrow();
    });

    it('should return user notes', () => {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId });
      const notes = res.fetch();

      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(noteOne);
    });

    it('should return 0 notes for user that have none', () => {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: 'userWith0notes' });
      const notes = res.fetch();

      expect(notes.length).toBe(0);
    });
  });
}
