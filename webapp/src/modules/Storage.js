function addUser(name, login) {
  const array = [
    {
      profile: name, password: login, address: '', privacy: 'Private', friends: [], training: false, img: '',
    }];
  localStorage.setItem('users', JSON.stringify(array));
}

function getUser(name, password) {
  const users = JSON.parse(localStorage.getItem('users'));
  for (let i = 0; i < users.length; i += 1) {
    if (users[i].profile === name && users[i].password === password) {
      return users[i];
    }
  }
  return null;
}
function requestHelp(name, message) {
  const users = JSON.parse(localStorage.getItem('users'));
  let userAddress = '';
  for (let i = 0; i < users.length; i += 1) {
    if (users[i].profile === name) {
      userAddress = users[i].address;
    }
  }
  const k = JSON.parse(localStorage.getItem('help'));
  k.push({
    user: name, address: userAddress, helpMessage: message, responder: '',
  });
  localStorage.setItem('helpPosts', JSON.stringify(k));
}

function setResponder(name, post) {
  const newHelp = post;
  newHelp.responder = name;
  const k = JSON.parse(localStorage.getItem('help'));
  k.push(newHelp);
  localStorage.setItem('helpPosts', JSON.stringify(k));
}

function completedTraining(name) {
  const users = JSON.parse(localStorage.getItem('users'));
  for (let i = 0; i < users.length; i += 1) {
    if (users[i].profile === name) {
      users[i].training = true;
    }
  }
  localStorage.setItem('users', JSON.stringify(users));
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

function addFriend(name, friend) {
  const users = JSON.parse(localStorage.getItem('users'));
  for (let i = 0; i < users.length; i += 1) {
    if (users[i].profile === name) {
      users.friends.push(friend);
    }
  }
  localStorage.setItem('users', JSON.stringify(users));
}

function getHelpPosts() {
  return JSON.parse(localStorage.getItem('help'));
}

export default {
  addUser,
  changePrivacy,
  requestHelp,
  setResponder,
  completedTraining,
  addFriend,
  getHelpPosts,
  getUser,
};
