const defaultArrTodos =  
{
    place: 'place1',
    address: 'address2',
    description: 'description3',
    avatar: 'http://p10.qhimg.com/t019e9cf51692f735be.jpg'
}


const detailReducer = (state =defaultArrTodos, action) => {
    if (action.type === 'NAV')
        return {
            ...state,
            detail: {
                place: action.place,
                address: action.address,
                description: action.description,
                avatar: action.avatar
            }
        };
    return state;
}
export default detailReducer;