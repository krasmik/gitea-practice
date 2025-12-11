export default function createRepositoryPayload(repoName: string, description?: string, isPrivate: boolean = false) {
    const payload: { name: string; description?: string; private?: boolean } = {
        name: repoName
    };

    if (description) {
        payload.description = description;
    }

    if (isPrivate) {
        payload.private = true;
    }

    return payload;
}