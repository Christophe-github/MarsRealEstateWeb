import { createStore } from 'vuex'
import { Credentials } from './assets/js/utils';

export interface MarsState {
    loggedIn: boolean,
    credentials: Credentials | null
}


function restoreState(): MarsState {
    return JSON.parse(window.sessionStorage.getItem("state") ?? "{}") as MarsState
}

function saveState(state: MarsState) {
    window.sessionStorage.setItem("state", JSON.stringify(state))
}

const store = createStore<MarsState>({
    state() {
        return restoreState();
    },
    mutations: {
        login(state, credentials: Credentials) {
            state.loggedIn = true;
            state.credentials = credentials
            saveState(state)
        },
        logout(state) {
            state.loggedIn = false;
            state.credentials = null;
            saveState(state)
        }
    }
});

export { store };