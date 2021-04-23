
export const getRemedies = () => fetch("/api/home-remedies").then(res => res.json());

export const getRecipes = async (search) => {
    const decoded = decodeURIComponent(search);
    const url = `/api/recipes${decoded}`;
    const res = await fetch(url);
    return await res.json();

}

export const getFavRecipes = async (user) =>{
    const res = await fetch(`/api/users/${user}/favorites`);
    const jsonData  = await res.json();
    if(jsonData.length > 0)
        return jsonData[0].Favorites.map(obj =>
            ({title : obj["Recipe Title"] , 
            id : obj._id,
            ingredients:obj.Ingredients,
            instructions:obj.Instructions,
            images:obj.Images,
            cooktime : obj["Cook Time"],
            servings : obj.Servings

    }));
    else return [];
}

export async function getFavorites(user){
    const res = await fetch(`/api/users/${user}/favorites/show`);
    return await res.json();
}

export async function addFavorites(user,recipeID){
    const res = await fetch(`/api/users/${user}/favorites/add/${recipeID}`);
    return await res.json();
}

export async function delFavorites(user,recipeID){
    const res = await fetch(`/api/users/${user}/favorites/del/${recipeID}`);
    return await res.json();
}

export function createShop(user){
    const data = { userID: user };
    console.log("in createshop API")
    fetch("/api/createShop",{ method: 'POST', headers: {'Content-Type':'application/json',}, body: JSON.stringify(data),}).then(res => console.log(res));
}

export function getShopList(user){
    console.log("in getshop API")
    return fetch("/api/userShopList/"+user).then(res => res.json());
}

export function addShopList(user,item){
    console.log("in updateshop add API")
    return fetch("/api/userShopList/add/"+user+"/"+item).then(res => res.json());
}

export function delShopList(user,item){
    console.log("in updateshop del API")
    return fetch("/api/userShopList/del/"+user+"/"+item).then(res => res.json());
}