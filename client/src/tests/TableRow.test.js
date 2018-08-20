import React from 'react';
import { mount } from 'enzyme';
import TableRow from '../components/TableRow';
import data from '../data.json';

describe('TableRow Component', () => {

  let props,
      mountedTableRow;

  const tableRow = () => {
        if( !mountedTableRow ) {
          mountedTableRow = mount(
            <TableRow {...props } />
          )
        }
        return mountedTableRow;
      };

  beforeEach( () => {

    props = {
      data: data[0]
    }
    mountedTableRow = undefined;

  });

  it('has a header', () => {
    const header = tableRow().find('.table__header');
    expect(header).not.toBeNull();
  });

});
