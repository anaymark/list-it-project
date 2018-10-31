import React from 'react';
import { shallow } from '../../enzyme';
import ItemList from '../ItemList';
import jasmineEnzyme from 'jasmine-enzyme';


describe('Item', () => {
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

    it('renders messages', () => {
        const list = 'one';
        const user = 'Mark'
        const wrapper = shallow(<ItemList db = {database} newListName = {list} user = {user}/>)
        expect(wrapper.find('.all-items')).toBeDefined();
    })

    it('Items list for christmas list', () => {
        const newListName = "christmas";
        const wrapper = shallow(<ItemList db = {database} newListName = {newListName}/>)
        expect(wrapper.find('.this.props.activeList')).toBeTruthy();
    })

})