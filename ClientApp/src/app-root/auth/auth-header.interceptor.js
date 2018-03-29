export const authHeaderInterceptor = () => {
    return {
        request: (config) => {
            const token = localStorage.getItem('token')
            if(token){
                config.headers['Authorization'] = `Bearer ${token}`
                config.headers['Accept'] = 'application/json;odata=verbose'
            }
            return config
        }
    }
}