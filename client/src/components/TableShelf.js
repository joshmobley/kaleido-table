import React from 'react';
import copy from 'copy-to-clipboard';

class TableShelf extends React.Component {

  copyValue(event, value) {
    event.preventDefault();
    copy(value);
  }

  render() {

    const {
      sections
    } = this.props.data;

    return (
      <div className="table__shelf">
        { sections.map( section =>
          <div key={section.name}>
            <h4 className="table__sub-header">{section.name}</h4>
            <div className="table__section">
              { section.data.map( (data, index) =>
                <dl className="flex mb-4" key={ data.label }>
                  <dt className="bold">{ data.label }</dt>
                  <dd className="table__linkable">
                    { data.value }
                    <a
                      className="ml-2 text-small"
                      href="#copy"
                      onClick={(event) => this.copyValue(event, data.value)}
                      >
                      Copy
                    </a>
                  </dd>
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
