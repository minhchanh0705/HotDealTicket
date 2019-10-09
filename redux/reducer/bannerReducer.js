const bannersReducer = (state = [], action) => {
    if (action.type === 'PASS_BANNER') 
    return { ...state, banners: action.banners };    
    return state;
}
export default bannersReducer;