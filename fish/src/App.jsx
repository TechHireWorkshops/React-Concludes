import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NameModal from './components/NameModal';
import FishPage from './components/FishPage';
import CreateFish from './components/CreateFish';
import axios from 'axios';
import { Route, useHistory } from 'react-router-dom';

function App() {
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [fishes, setFishes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [newFish, setNewFish] = useState({
    image: '',
    Comments: '',
    Species: '',
  });
  const history = useHistory();

  useEffect(() => {
    fetchFish();
  }, []);

  const fetchFish = async () => {
    const response = await axios.get(
      `https://fishbase.ropensci.org/species?offset=${offset}`
    );
    setFishes(prevState => [...prevState, ...response.data.data]);
    setOffset(prevState => prevState + 10);
  };

  const deleteFish = SpecCode => {
    setFishes(prevState => prevState.filter(fish => fish.SpecCode != SpecCode));
  };

  const handleChangeName = e => {
    const value = e.target.value;
    setName(value);
  };

  const handleFishChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    setNewFish(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFishSubmit = e => {
    e.preventDefault();
    setFishes(prevState => [...prevState, newFish]);
    setNewFish({
      image: '',
      Comments: '',
      Species: '',
    });
    history.push('/');
  };

  return (
    <div className='app'>
      <Header name={name} setShowModal={setShowModal} />
      {showModal && (
        <NameModal
          handleChangeName={handleChangeName}
          setShowModal={setShowModal}
        />
      )}
      <Route exact path='/'>
        <FishPage
          fishes={fishes}
          fetchFish={fetchFish}
          deleteFish={deleteFish}
        />
      </Route>
      <Route path='/create'>
        <CreateFish
          newFish={newFish}
          handleFishChange={handleFishChange}
          handleFishSubmit={handleFishSubmit}
        />
      </Route>
    </div>
  );
}

export default App;
