export function generateUniqueEmail(): string {
    const timestamp = Date.now();
    return `krasmik+${timestamp}@qamadness.com`;
}
