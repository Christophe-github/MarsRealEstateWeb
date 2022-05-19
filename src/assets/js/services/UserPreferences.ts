
const KEY_DARKMODE = 'pref_darkmode';

class UserPreferences {
    static getDarkmodePreferred() {
        return localStorage.getItem(KEY_DARKMODE) === "true";
    }
   
    static setDarkmodePreferred(value : boolean) {
        localStorage.setItem(KEY_DARKMODE,value.toString());
    }
}

export default UserPreferences