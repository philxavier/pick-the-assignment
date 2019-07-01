import React from 'react'
import { render, shallow, mount, configure} from 'enzyme'
import ConsulateImg from '../ConsulateImg.jsx';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

describe('ConsulateImg.jsx', () => {
    it('Should render App without errors', () => {
        render(<ConsulateImg  />)
    })

    it('should render without throwing an error', () => {
      var wrapper = shallow(<ConsulateImg src='test_src' />)
      console.log('this is wrapper................', wrapper);
      expect(wrapper.find('#consulateImg')).toBeDefined()
      expect(wrapper.find())
     })

})