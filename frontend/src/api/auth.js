const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/auth`

export const signup = async(data) => {
    const res = await fetch(`${baseUrl}/signup`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:'include',
        body:JSON.stringify(data)
    })
    const resData = await res.json();
    return resData;
}

export const login = async(data) => {
    const res = await fetch(`${baseUrl}/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:'include',
        body:JSON.stringify(data)
    })
    const resData = await res.json();
    return resData;
}


export const fetchUser = async() => {
    const res = await fetch(baseUrl,{
        credentials:'include',
    })
    const resData = await res.json();
    return resData;
}

export const logout = async() => {
    const res = await fetch(`${baseUrl}/logout`,{
        credentials:'include',
    })
    const resData = await res.json();
    return resData;
}


