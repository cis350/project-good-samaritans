import { React } from 'react';

function Request({ name }) {
  // Gonna change this after adding routes
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <div>
      <h1>
        What is your issue
        {' '}
        {name}
      </h1>
      <input type="text" />
      <button type="submit" onClick={refreshPage}>
        <div>
          Report non-immediate emergency
        </div>
      </button>
    </div>
  );
}

export default Request;
