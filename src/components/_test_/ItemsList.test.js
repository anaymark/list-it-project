import React from 'react';
import { shallow } from '../../enzyme';
import ShopList from '../ShopList';
import * as firebase from 'firebase';

describe('List Test', () => {
    beforeEach(() => {
       
    })

    it('renders list', () => {
        const list = 'one';
        const database = {firebase};
        const wrapper = shallow(<ShopList newListName = {list}/>)
        expect(wrapper.find('.all-lists')).toBeDefined;
    })
})