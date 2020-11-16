import React from 'react';

export default function FishPage({ fishes, fetchFish, deleteFish }) {
  return (
    <div className='fish-page'>
      {fishes.map(fish => (
        <div className='fish'>
          <h1>{fish.Species}</h1>
          {fish.image ? (
            <img src={fish.image} alt='' />
          ) : (
            <img src='https://lh3.googleusercontent.com/proxy/-SbItfvIjj9ISMg5ms8FcBTXCImi5MN76mG3y71PImnAcn4b1LRnGvARyi5o3pTDBodjCMmrMmgIHTbokXt6BLALxlO2Abo' />
          )}
          <p>{fish.Comments ? fish.Comments : 'No description of this fish'}</p>
          <button onClick={() => deleteFish(fish.SpecCode)}>Delete Fish</button>
        </div>
      ))}
      <button onClick={fetchFish}>Get More Fish</button>
    </div>
  );
}
