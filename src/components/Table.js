import React from 'react';
import TableRow from './TableRow';
import TableShelf from './TableShelf';

class Table extends React.Component {

  constructor() {
    super();

    this.state = {
      openId: '' // ID of network that is currently toggled open
    };

    this.toggleShelf = this.openShelf.bind(this);
  }

  openShelf(e, id) {
    this.setState({ openId: id });
  }

  render () {

    return (
      <div className="table">
        <h2 className="table__title">My Nodes</h2>
        { this.props.data.map( obj =>
          <div
            key={ obj.id }
            onClick={ (e) => this.openShelf(e, obj.id) }
            className={ this.state.openId === obj.id ? "table__group--active" : "table__group" }
            >
            <TableRow data={ obj } />
            <TableShelf data={ obj } />
          </div>
        )}
      </div>
    );
  };
}

export default Table;
