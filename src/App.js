import React from 'react';
import Welcome from '../src/components/Welcome';
import Navbar from '../src/components/Navbar';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Welcome />
    </div>
  );
};

export default App;

