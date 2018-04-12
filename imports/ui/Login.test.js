import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Login } from './Login';


if (Meteor.isClient) {
  describe('Login', function () {
    it('should show or not error messages', () => {
      const error = 'This is not working;';
      const wrapper = mount(<Login loginWithPassword={() => {}} />);

      wrapper.setState({ error });
      expect(wrapper.find('p').text()).toBe(error);
      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should submit form with corresponding inputs', () => {
      const email = 'x@x.com';
      const password = 'password';
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy} />);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');
      expect(spy.calls[0].arguments[0]).toEqual({ email });
      expect(spy.calls[0].arguments[1]).toEqual(password);
    });

    it('should set/or not loginWithPassword login errors', function () {
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy} />);
      wrapper.find('form').simulate('submit');
      // expect(spy.calls[0].arguments[2].arguments[0]).toExist();
      spy.calls[0].arguments[2]({});
      expect(wrapper.state('error')).toExist();

      spy.calls[0].arguments[2]();
      expect(wrapper.state('error')).toNotExist();
    });
  });
}

