import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { PrivateHeader } from './PrivateHeader';

if (Meteor.isClient) {
  describe('PrivateHeader', function () {
    it('should use title props as H1 text', function () {
      const title = 'Notes App';
      const wrapper = mount(<PrivateHeader isNavOpen={false} title={title} handleLougout={() => {}} />);
      expect(wrapper.find('h1').text()).toEqual(title);
    });

    it('should call handle logout on click', function () {
      const spy = expect.createSpy();
      const wrapper = mount(<PrivateHeader isNavOpen={false} title="" handleLougout={spy} />);
      wrapper.find('button').simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });
}
