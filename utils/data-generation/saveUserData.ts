import * as fs from 'fs';
import * as path from 'path';

export default function saveUserData(userData: { userName: string; userEmail: string; userPassword: string, userToken: string }, filePath: string) {
    const dir = path.dirname(filePath);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(userData));
}