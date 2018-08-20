import React from 'react';
import { mount } from 'enzyme';
import TableShelf from '../components/TableShelf';
import data from '../data.json';

describe('TableShelf Component', () => {

  let props,
      mountedTableShelf;

  const tableShelf = () => {
        if( !mountedTableShelf ) {
          mountedTableShelf = mount(
            <TableShelf {...props } />
          )
        }
        return mountedTableShelf;
      };

  beforeEach( () => {

    props = {
      data: data[0]
    }

    mountedTableShelf = undefined;

  });

  it('has sections that match number of data.sections', () => {
    const sections = tableShelf().find('.table__section');
    expect(sections.length).toBe(2);
  });

  it('displays number of objects inside of data.sections', () => {
    const data = tableShelf().find('.table__section dl');
    let dataCount = 0;
    props.data.sections.forEach((section) => {
      dataCount += section.data.length;
    });
    expect(data.length).toEqual(dataCount);
  });

});
