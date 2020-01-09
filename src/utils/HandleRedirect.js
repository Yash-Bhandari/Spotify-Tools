const re = /access_token=([^&]+)/;
const handleRedirect = (authorized, setAccessToken) => {
    if (authorized)
        return;

    let access_token = re.exec(window.location.toString());
    if (access_token) {
        setAccessToken(access_token[1]);
    }
}

export default handleRedirect;