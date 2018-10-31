import React from 'react';
import { shallow } from '../../enzyme';
import ShopList from '../ShopList';
import jasmineEnzyme from 'jasmine-enzyme';



describe('List Test', () => {
    let database;
    beforeEach(() => {
       database = {
           database: () => {
              return   {
                ref: () => {
                    return {
                    on: () => {}
                    }
                }
              }
            } 
           }
    },
    () => {
        jasmineEnzyme();
    }
    )

    it('renders list', () => {
        const list = 'one';
        const wrapper = shallow(<ShopList db = {database} newListName = {list}/>)
        expect(wrapper.find('.all-lists')).toBeDefined();
    })

    it('add a list/list exists', () => {
        const newListName = "christmas";
        const wrapper = shallow(<ShopList db = {database} newListName = {newListName}/>)
        expect(wrapper.find('.this.props.activeList')).toBeTruthy();
    })

})