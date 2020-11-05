const divStyle = {
  padding: '5px',
  backgroundColor: 'lightgrey',
  border: 0,
  textAlign: 'center',
}

function App() {
  const footerText = "footer text";
  const author = {
    name: "John Doe",
    phone: "888-555-1212",
    email: "jdoe@gmail.com",
  }

  return (
    <div className={"boxed"}>
      <Header />
      <Body author={author} />
      <Footer text={footerText} />
    </div>
  );
}

export default App;

const title = "My React App";
const Header = () => <div style={divStyle}><h3>{title}</h3></div>
const Body = ({author}) => (
  <div>
    <p>Author: {author.name}</p>
    <p>Some random text</p>
  </div>
);
const Footer = ({text}) => <div style={divStyle}><h4>{text}</h4></div>