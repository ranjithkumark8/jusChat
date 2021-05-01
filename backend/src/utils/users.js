const users = [];

function userJoin(id, userName, group) {
  userName = userName.trim().toLowerCase();
  group = group.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.group === group && user.userName === userName
  );

  // if (!userName || !group) return { error: "User Name and Group are required" };
  if (existingUser) return { error: "User Name is taken" };

  const user = { id, userName, group };
  users.push(user);
  return { user };
}

function getGroupUsers(group) {
  return users.filter((user) => user.group === group);
}

function getCurrentUser(id) {
  // console.log(users);
  return users.find((user) => user.id === id);
}

function removeUser(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
}
module.exports = { userJoin, getGroupUsers, getCurrentUser, removeUser };
