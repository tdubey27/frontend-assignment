import './Table.css';
import PropTypes from "prop-types";

const Table = (props) => {
  const { heading, data } = props;

  return (
    <div role="table" aria-labelledby="table-caption">
      <table>
        <caption id="table-caption">Table</caption>
        <thead>
          <tr>
            {heading.map((header) => (
              <th key={header} scope="col" aria-label={header.replace(".", " ")}>
                {header.replace(".", " ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} role="row">
              {heading.map((header) => (
                <td key={header} role="cell">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  heading: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
