//HASH
export const userKey = (email: string) => `user#${email}`;

// HYPERLOGLOG
export const usersRecentlyLoginKey = () => `usersRecentlyLogin`;

export const usersHaveRegisteredKey = () => `usersHaveRegistered`;

export const userFriendsKey = (email: string) => `userFriends#${email}`;
