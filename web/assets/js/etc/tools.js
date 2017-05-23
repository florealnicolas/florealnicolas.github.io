function getFavouriteCookiePart (cookieKey) {
    const cookiePieces = document.cookie.split(";");

    let selectedCookiePiece = null;

    for (let piece =0; piece < cookiePieces.length;piece++) {

        if (cookiePieces[piece].includes(cookieKey)) {
            selectedCookiePiece = cookiePieces[piece];
        }
    }

    if (selectedCookiePiece != null) {
    const keyValue = selectedCookiePiece.split("=");

    let key = keyValue[0];
    let value = keyValue[1];

    return {key:key,value:value};}

    else {
        return selectedCookiePiece;
    }
}

function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}