export const Products = ({ products }) => {
  return (
    <div className="page">
      <h4>Products Page</h4>
      <p>List of products</p>
      <ul style={styles.ul}>
        {products.map((p,i) => <li key={i}><a href={"/details/"+i}>{p.name}</a></li>)}
      </ul>
    </div>
  )
}

const styles = {
  ul: {
    textAlign: 'left',
  },
}