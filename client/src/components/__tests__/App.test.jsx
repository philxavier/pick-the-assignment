import React from 'react'
import { render, shallow, mount, configure} from 'enzyme'
import App from '../App.jsx';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('SearchBar.jsx', () => {
    it('Should render App without errors', () => {
        render(<App  />)
        var wrapper = shallow(<App/>);
    })
})

// import React from 'react'
// import { configure, shallow } from 'enzyme';



// describe('First React component test with Enzyme', () => {
//    it('renders without crashing', () => {
//       let Wrapper = shallow(<App />);
//       expect(Wrapper).toMatchSnapshot()
//     });
// });

// describe('App/> rendering', () => {
//    it('should render a <TextField /> to type the comment', () => {
//        expect(Wrapper.find(TextField)).toHaveLength(1);
//    });

   // it('should render a <Typography /> to display the maximum length of the comment', () => {
   //     expect(wrapper.find(Typography)).toHaveLength(1);
   // });
// });