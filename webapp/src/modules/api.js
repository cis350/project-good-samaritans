/* eslint-disable no-useless-catch */
const axios = require('axios');

const rootURL = 'http://localhost:5000';

// profile page - sends request to change the privacy setting
export async function changePrivacy(name, setting) {
  if (!name || !setting) {
    throw new Error('no privacy setting');
  }

  try {
    await axios.put(`${rootURL}/user/${name}/privacy`, { privacy: setting });
    return;
  } catch (err) {
    throw err;
  }
}

// signup page - sends request to add user
export async function addUser(
  name,
  street,
  state,
  country,
  zip,
  password,
  privacy,
  time,
  noHelped,
  noRequests,
) {
  if (!name || !street || !state || !country || !zip || !password) {
    throw new Error('field error');
  }

  try {
    await axios.post(`${rootURL}/user/${name}/${street}/${state}/${country}/${zip}/${password}/${privacy}`, { date: time, helpedNo: noHelped, requestsNo: noRequests });
    return;
  } catch (err) {
    throw err;
  }
}

// increment number of people helped

// increment number of requests made
export async function incrementRequest(name) {
  if (!name) {
    throw new Error('no user given');
  }

  try {
    await axios.put(`${rootURL}/requests/${name}`);
    return;
  } catch (err) {
    throw err;
  }
}

export async function getProfile(name) {
  if (!name) {
    throw new Error('no user given');
  }

  try {
    const result = await axios.get(`${rootURL}/user/${name}`);
    return result.data.data;
  } catch (err) {
    throw err;
  }
}

export async function addMessage(name, name2, message, time) {
  if (!name || !name2 || !message || !time) {
    throw new Error('field error');
  }

  try {
    await axios.put(`${rootURL}/message/${name}/${name2}/${message}/${time}`);
    return;
  } catch (err) {
    throw err;
  }
}

export async function getMessages(name, name2) {
  if (!name || !name2) {
    throw new Error('field error');
  }

  try {
    const result = await axios.get(`${rootURL}/message/${name}/${name2}`);
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function soloGetMessages(name) {
  if (!name) {
    throw new Error('field error');
  }

  try {
    const result = await axios.get(`${rootURL}/message/${name}`);
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function getLoginTrue(name, password) {
  if (!name || !password) {
    return false;
  }

  try {
    const result = await axios.get(`${rootURL}/login/${name}/${password}`);
    return result.data.data;
  } catch (err) {
    throw err;
  }
}

// login page - if the username is correct but wrong password
export async function getPasswordTrue(name, password) {
  if (!name || !password) {
    return false;
  }

  try {
    const result = await axios.get(`${rootURL}/lockout/${name}/${password}`);
    return result.data.data;
  } catch (err) {
    throw err;
  }
}

// login page - resetting password
export async function changePassword(name, newPwd) {
  if (!name || !newPwd) {
    throw new Error('no password to change');
  }

  try {
    await axios.put(`${rootURL}/change-pwd/${name}`, { password: newPwd });
    return;
  } catch (err) {
    throw err;
  }
}

// profile page - gets the current list of help posts
export async function postRequest(name, post) {
  try {
    await axios.post(`${rootURL}/request/${name}/${post}`);
  } catch (err) {
    throw err;
  }
}

// profile page - get the user's friends
// export async function getFriends(name) {
//   if (!name) {
//     throw new Error('no user given');
//   }

//   try {
//     const result = await axios.get(`${rootURL}/friends/${name}`);
//     return result;
//   } catch (err) {
//     throw err;
//   }
// }

// profile page - gets the current list of help posts
export async function getHelpPosts() {
  try {
    const result = await axios.get(`${rootURL}/help`);
    return result.data.data;
  } catch (err) {
    throw err;
  }
}

export async function getSpecificHelp(name) {
  if (!name) {
    return false;
  }

  try {
    const result = await axios.get(`${rootURL}/help/${name}`);
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteHelp(name, message, helper) {
  if (!name) {
    return false;
  }

  try {
    const result = await axios.put(`${rootURL}/help/${name}/${message}/${helper}`);
    return result.data;
  } catch (err) {
    throw err;
  }
}

// profile page - gets the current list of people you are currently helping
// export async function getSamaritanTexts(name) {
//   if (!name) {
//     throw new Error('no user given');
//   }

//   try {
//     const result = await axios.get(`${rootURL}/texts/${name}`);
//     return result.data;
//   } catch (err) {
//     throw err;
//   }
// }
