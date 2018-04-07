import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { validateNewUser } from './users';

if (Meteor.isServer) {
  describe('users', function () {
    it('should validete valid email adress', function () {
      const user = {
        emails: [
          {
            address: 'dupa@bunga.com'
          }
        ]
      };
      expect(validateNewUser(user)).toBe(true);
    });

    it('should invalidate invalid email adress', function () {
      const user = {
        emails: [
          {
            address: 'dupa.bunga.com'
          }
        ]
      };
      expect(() => { validateNewUser(user); }).toThrow();
    });
  });
}


