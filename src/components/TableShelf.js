import React from 'react';

class TableShelf extends React.Component {

  render() {

    const {
      id,
      sections
    } = this.props.data;

    const isOpen = this.props.isOpen;

    return (
      <div className={ isOpen == id ? "table__shelf--active" : "table__shelf" }>
      { sections.map( section =>
          <div key={section.name}>
            <h4 className="table__sub-header">{section.name}</h4>
            <div className="table__section">
              { section.data.map( data =>
                <dl className="flex mb-4" key={ data.label }>
                  <dt className="bold">{ data.label }</dt>
                  <dd>{ data.value }</dd>
                </dl>
              )}
            </div>
          </div>
      )}
      </div>
    )
  }
}

export default TableShelf;
