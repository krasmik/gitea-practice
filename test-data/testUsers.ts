// Function to get test users from file, with singleton caching
// Use getTestUsers() to access up-to-date user data and their apiKey
// If the file does not exist, returns an empty object (setup test will create it)

import * as fs from 'fs';
import * as path from 'path';

let cachedUsers: any = null;
const usersFilePath = path.resolve(__dirname, 'generatedUsers.json');

export function getTestUsers() {
    if (!cachedUsers) {
        if (!fs.existsSync(usersFilePath)) {
            // File will be created by setup test, so just return empty object
            cachedUsers = {};
            return cachedUsers;
        }
        const raw = fs.readFileSync(usersFilePath, 'utf-8');
        cachedUsers = JSON.parse(raw);
    }
    return cachedUsers;
}