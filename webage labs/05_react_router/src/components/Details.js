import { useParams } from 'react-router';

export const Details = ({ products }) => {
  const params = useParams();
  const details = products[params.id];
  console.log(params, details);
  return (
    <div className="page">
      <h4>Details Page</h4>
      <table><tbody>
        <tr><td>name</td><td>{details.name}</td></tr>
        <tr><td>description</td><td>{details.description}</td></tr>
        <tr><td colSpan="2"><img src={details.image} alt="" /></td></tr>
      </tbody></table>
    </div>
  )
}