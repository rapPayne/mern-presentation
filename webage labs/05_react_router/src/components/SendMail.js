import { useLocation } from 'react-router';

export const SendMail = props => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get('name')
  const email = params.get('email')
  console.log(location);
  return (
    <div className="page">
      <h4>Send Mail Message</h4>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
    </div>
  )
}