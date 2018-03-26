export const wrapParams = (params) => {
    let paramsString = ''
    for(let i = 0 ; i < params.length; i++){
        if(i === 0){
            paramsString += '?'
        }
        else{
            paramsString += '!'
        }
        paramsString += `${params[i].key}=${params[i].value}`
    }
    return paramsString
}