const detailIdReducer = (state = 0, action) => {
    if (action.type === 'NAV') 
    return { ...state, detailId: action.detailId };
    return state;
}
export default detailIdReducer;