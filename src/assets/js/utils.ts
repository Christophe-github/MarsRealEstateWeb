async function delay(timeMs = 200) {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeMs);
    });
}


class Credentials {
    constructor(readonly username: string, readonly password: string) { }
}


export { delay , Credentials};