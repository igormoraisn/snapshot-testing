export function getTestBrowser(testName: string, browser: string) {
    const splittedName = testName.split('.');
    const loginTestBrowserName = `${splittedName[0]}-${browser}.${splittedName[1]}`
    return loginTestBrowserName
}