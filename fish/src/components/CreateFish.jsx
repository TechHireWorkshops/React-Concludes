import React from 'react';

export default function CreateFish({ newFish, handleFishChange, handleFishSubmit }) {
  return (
    <div>
      <h1>Add a new fish</h1>
      <form onSubmit={handleFishSubmit}>
        <label>
          Species
          <input
            type='text'
            name='Species'
            onChange={handleFishChange}
            value={newFish.Species}
          />
        </label>
        <label>
          Comments
          <input
            type='text'
            name='Comments'
            onChange={handleFishChange}
            value={newFish.Comments}
          />
        </label>
        <label>
          Image Link
          <input
            type='text'
            name='image'
            onChange={handleFishChange}
            value={newFish.image}
          />
        </label>
        <input type='submit' value='Add Fish' />
      </form>
    </div>
  );
}
