import React from 'react';

class TableRow extends React.Component {

  render() {

    const {
      header,
      id,
      logStatus,
      netStatus,
      vpcPublic,
      vpcPrivate
    } = this.props.data;

    return (
      <div className="table__row">
        <div className="table__header">
          <i className={
            "mr-2 " +
            (netStatus ? 'status-light--active' : 'status-light')
          }>Active</i>
          <i className="icon--environment mr-2"></i>
          <h3>{ header }</h3>
        </div>
        <span className="table__info">{ id }</span>
        <span className="table__info">Log Streaming: { logStatus ? "On" : "Off" }</span>
        <span className="table__info">
          VPC:
          { vpcPublic ? " Public" : "" }
          { vpcPublic && vpcPrivate ? " &" : "" }
          { vpcPrivate ? " Private" : "" }
          { !vpcPublic && !vpcPrivate ? " None" : "" }
        </span>
      </div>
    );
  }
}

export default TableRow;
