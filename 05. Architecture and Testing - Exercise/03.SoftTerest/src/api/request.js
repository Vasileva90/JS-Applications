async function dataRequest(url,method,headers,body){
    const options={
        method,
        headers
    }
    
    if(body){
        options.body =JSON.stringify(body)
    }
    if(method=="POST"){
        options.headers["Content-type"]="application/json";
    }
    
    const response = await fetch(url,options)
    if(!response.ok){
        const error = await response.json();
        throw new Error(error.message) 
    }
    return response.json()
}

export{
    dataRequest
}