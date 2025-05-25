import PropTypes from "prop-types";

const RecoveredItemTable = ({data}) => {

  let i = 1;

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Recovered Location</th>
            <th>Recovered Date</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d._id}>
              <th>{i++}</th>
              <td>{d.recoveredLocation}</td>
              <td>{d.date}</td>
              <td>{d.recoveredPerson.displayName}</td>
              <td>{d.recoveredPerson.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

RecoveredItemTable.propTypes = {
  data: PropTypes.any,
};

export default RecoveredItemTable;
