import React from 'react';

class TableShelf extends React.Component {

  copyValue(event, index) {
    event.preventDefault();

    var emailLink = document.querySelector('#linkable-0');
    var range     = document.createRange();
    range.selectNode(emailLink);
    window.getSelection().addRange(range);
    var successful = document.execCommand('copy');

    /*
    var node = document.querySelector('#linkable-' + index);
    var range = document.createRange();
    range.selectNode(node);
    window.getSelection().addRange(range);
    console.log(window.getSelection());
    document.execCommand('copy');
    */
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
                  <dd className="table__linkable" id={"linkable-" + index}>
                    { data.value }
                    <a className="ml-2 text-small" href="#copy" onClick={(event) => this.copyValue(event, index)}>Copy</a>
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
