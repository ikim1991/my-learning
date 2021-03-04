import bcrypt from 'bcrypt';

// Dummy Database
const users = {
    'user1@example.com': {
        pwHash: bcrypt.hashSync('user1pw', 10),
        roles: ['ADMIN'],
        id: 0
    },
    'user2@example.com': {
        pwHash: bcrypt.hashSync('user2pw', 10),
        roles: ['ACCOUNT_MANAGER'],
        id: 1
    }
}

export const findUserByEmail = async (email) => {

    const user = users[email];

    return user ? user : Promise.reject('User not found...');
}