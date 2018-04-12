import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Signup } from './Signup';


if (Meteor.isClient) {
  describe('Signup', function () {
    it('should show or not error messages', () => {
      const error = 'This is not working;';
      const wrapper = mount(<Signup createUser={() => {}} />);

      wrapper.setState({ error });
      expect(wrapper.find('p').text()).toBe(error);
      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should submit form with corresponding inputs', () => {
      const email = 'x@x.com';
      const password = 'password123';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');
      expect(spy.calls[0].arguments[0]).toEqual({ email, password });
      // expect(spy.calls[0].arguments[1]).toEqual(password);
    });

    it('should invalidate short pass', () => {
      const email = 'x@x.com';
      const password = 'passwor';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');
      expect(wrapper.state('error')).toExist();
      // expect(spy.calls[0].arguments[1]).toEqual(password);
    });

    it('should set/or not createUser login errors', function () {
      const spy = expect.createSpy();
      const email = 'x@x.com';
      const password = 'password123';
      const wrapper = mount(<Signup createUser={spy} />);
      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');
      // expect(spy.calls[0].arguments[2].arguments[0]).toExist();
      spy.calls[0].arguments[1]({ reason: 'Go to hell' });
      expect(wrapper.state('error')).toExist();

      spy.calls[0].arguments[1]();
      expect(wrapper.state('error')).toNotExist();
    });
  });
}
