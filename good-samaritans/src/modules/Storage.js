/* eslint-disable no-console */

function addUser(name) {
    const array = [{ profile: name, privacy: 'Private' }];
    localStorage.setItem('users', JSON.stringify(array));
  }
  
  function changePrivacy(name, privacy) {
    const profile = localStorage.getItem('users');
    if (profile == null) {
      addUser(name);
    }
    for (let i = 0; i < profile.length; i += 1) {
      if (profile[i].profile === name) {
        profile[i].privacy = privacy;
      }
    }
    localStorage.setItem(name, JSON.stringify(profile));
  }
  
  export default {
    addUser, changePrivacy,
  };