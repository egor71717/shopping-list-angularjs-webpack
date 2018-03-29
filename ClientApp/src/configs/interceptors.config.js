const configureInterceptors = ($httpProvider) => {
    $httpProvider.interceptors.push('authHeaderInterceptor')
}
export const interceptorsConfig = ['$httpProvider', configureInterceptors]