//local storage
function storeArr(key,array){
    let string = JSON.stringify(array);
    localStorage.setItem(key,string);
}

function getArr(key){
    let string = localStorage.getItem(key);
    let array = JSON.parse(string);
    return array;
}

export {storeArr,getArr};