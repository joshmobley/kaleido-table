import React from 'react';
import { mount } from 'enzyme';
import Table from '../components/Table';
import data from '../data.json';

describe('Table Component', () => {

  let props,
      mountedTable;

  const table = () => {
        if( !mountedTable ) {
          mountedTable = mount(
            <Table {...props } />
          )
        }
        return mountedTable;
      };

  beforeEach( () => {

    props = {
      data: data
    }
    mountedTable = undefined;

  });

  it('has a title', () => {
    const title = table().find('.table__title');
    expect(title.length).toBeGreaterThan(0);
  });

  it('has rows that match number of objects', () => {
    const rows = table().find('.table__row');
    expect(rows.length).toEqual(data.length);
  });

  it('has shelves that match number of objects', () => {
    const shelves = table().find('.table__shelf');
    expect(shelves.length).toEqual(data.length);
  });

  it('opens a table group on click', () => {
    const group = table().find('.table__group').first();
    group.simulate('click');
    expect(table().find('.table__group--active').length).toBeGreaterThan(0);
  });

  it('only 1 table group can be open at a time', () => {
    const group1 = table().find('.table__group').first();
    const group2 = table().find('.table__group').last();
    group1.simulate('click');
    group2.simulate('click');
    expect(table().find('.table__group--active').length).toBe(1);
  });


});
