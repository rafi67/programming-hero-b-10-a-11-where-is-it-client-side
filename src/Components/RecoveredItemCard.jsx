import PropTypes from "prop-types";

const RecoveredItemCard = ({data}) => {

  console.log('recovered item card data', data);

  return (
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mx-auto">
          {data.map((d) => (
            <div key={d._id} className="card bg-base-100 w-full shadow-sm">
              <figure>
                <img
                  src={`${d.thumbnail}`}
                  alt="data"
                  className="w-full h-[250px]"
                />
              </figure>
              <div className="card-body text-left">
                <h2 className="card-title">{d.title}</h2>
                <p>{d.date}</p>
                <p>{d.contactInformation.displayName}</p>
                <p>{d.location}</p>
              </div>
            </div>
          ))}
        </div>
  );
};

RecoveredItemCard.propTypes = {
  data: PropTypes.any,
};

export default RecoveredItemCard;
