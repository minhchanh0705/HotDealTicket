const categoriesReducer = (state = [], action) => {
    if (action.type === 'PASS_CATEGORIES') 
    return { ...state, categories: action.categories }; 
    return state;
}
export default categoriesReducer;