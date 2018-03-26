import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { LOCAL_STORAGE_KEYS } from '../../constants/localStorage-keys.constant'
import { apiRoot } from '../../constants/api-root.constant'

const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

const actorFromJWT = (token) => {
    const data = parseJwt(token)
    const userdataClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"
    const userdata = JSON.parse(data[userdataClaim])

    const actor = {}
    actor.id = data.actort
    actor.username = userdata.Username
    actor.basketId = userdata.BasketClaimId
    return actor
}

const resolveAuthentication = (resolve, resolveCallback, $state) => {
    const token = resolve.data
    localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, token)
    if(resolveCallback)
        resolveCallback()
    return actorFromJWT(token)
}

const checkToken = () => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)
    if(token){
        return actorFromJWT(token)
    }
    localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)
    return undefined
}

export const authServiceFactory = ($http, $state) => {
    const authService = {}
    authService.isAuthenticated$ = new BehaviorSubject(false)
    authService.currentUser$ = new BehaviorSubject(undefined)

    authService.init = () => {
        const currentUser = checkToken()
        if(currentUser){
            authService.isAuthenticated$.next(true)
            authService.currentUser$.next(currentUser)
        }
        return authService
    }

    authService.login = (auth, resolveCallback, rejectCallback) => {
        const authUrl = `${apiRoot}/auth/login`
        $http.post(authUrl, auth).then(
            resolve => {
                const currentUser = resolveAuthentication(resolve, resolveCallback)
                authService.isAuthenticated$.next(true)
                authService.currentUser$.next(currentUser)
                $state.go('shoppinglist')
            },
            reject => {
                console.error(reject.data)
                if(rejectCallback)
                    rejectCallback(reject)
            }
        )
    }

    authService.logout = () => {
        authService.isAuthenticated$.next(false)
        authService.currentUser$.next(undefined)
        localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)
        $state.go('auth')
    }

    authService.register = (auth, resolveCallback, rejectCallback) => {
        const registerUrl = `${apiRoot}/auth/register`;
        $http.post(registerUrl, auth).then(
            resolve => {
                const currentUser = resolveAuthentication(resolve, resolveCallback)
                authService.isAuthenticated$.next(true)
                authService.currentUser$.next(currentUser)
                $state.go('shoppinglist')
            },
            reject => {
                console.error(reject.data)
                if(rejectCallback)
                    rejectCallback(reject)
            }
        )
    }

    return authService.init()
}
authServiceFactory.$inject = ['$http', '$state']