const eventsReducer = (state = [], action) => {
    if (action.type === 'PASS_EVENTS') 
    return { ...state, events: action.events };    
    return state;
}
export default eventsReducer;