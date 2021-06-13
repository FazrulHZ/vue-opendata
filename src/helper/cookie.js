/* eslint-disable eqeqeq */
/* eslint-disable semi */
/* eslint-disable space-before-function-paren */
var CryptoJS = require('crypto-js');

export default {
    get: (cname) => {
        var name = cname + '=';
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    },

    set: (key, value) => {
        const now = new Date()
        let time = now.getTime()
        time += 3600 * 1000
        now.setTime(time)
        document.cookie = key + '=' + (value || '') + '; expires=' + now.toUTCString() + '; path=/'
    },

    delete: () => {
        var cookies = document.cookie.split(';');

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf('=');
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
    },

    getCookie: (key) => {
        const _key = key + '=';
        const ca = document.cookie.split(';');

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(_key) === 0) {
                return c.substring(_key.length, c.length)
            }
            return null
        }
    },

    enc: (value) => {
        const enc = CryptoJS.AES.encrypt(JSON.stringify(value), '531414009').toString();
        return enc
    },

    dec: (value) => {
        var bytes = CryptoJS.AES.decrypt(value, '531414009');
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData
    }
}
