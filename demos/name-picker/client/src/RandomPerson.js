import { useEffect, useState } from 'react';

export const RandomPerson = () => {
  const [person, setPerson] = useState({})
  useEffect(() => {
    fetch(`/api/people/random`)
      .then(res => res.json())
      .then(randomPerson => setPerson(randomPerson));
  }, []);
  return (
    <>
      <h1>Our lucky person is ...</h1>
      <p>{person.name}</p>
    </>
  )
}