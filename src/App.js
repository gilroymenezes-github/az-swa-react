import React, {useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    (async function() {
      const { text } = await (await fetch(`/api/ipomoea`)).json();
      setData(text);
    })();
  });

  return <div>{data}</div>

  // const value = 'World';
  // return <div>Hello {value}</div>;

}

export default App;
