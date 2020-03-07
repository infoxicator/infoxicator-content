import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import AppConfig from '../../src/appConfig';
import InfoxicatorContent from '../../src/components/InfoxicatorContent';

describe('InfoxicatorContent', () => {
  it('default export should return a function', () => {
    expect(InfoxicatorContent).toBeInstanceOf(Function);
  });

  it('module should render correct JSX', () => {
    const renderedModule = shallow(<InfoxicatorContent />);
    expect(toJson(renderedModule)).toMatchSnapshot();
  });

  // test only necessary for root modules
  it('appConfig should contain accurate csp', () => {
    expect(AppConfig.csp).toBeDefined();
    expect(typeof AppConfig.csp).toBe('string');
  });
});
