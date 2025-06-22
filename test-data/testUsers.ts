import * as fs from 'fs';
import * as path from 'path';

let cachedUsers: any = null;
const usersFilePath = path.resolve(__dirname, 'generatedUsers.json');

export function getTestUsers() {
    if (!cachedUsers) {
        if (!fs.existsSync(usersFilePath)) {
            throw new Error('User data file not found: ' + usersFilePath);
        }
        const raw = fs.readFileSync(usersFilePath, 'utf-8');
        cachedUsers = JSON.parse(raw);
    }
    return cachedUsers;
}