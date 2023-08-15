//action creator
const GETINFOR = "data/get"

export function GetInfor(data : any)
{
    return { type : GETINFOR, payload:data}
}

type State = ReturnType<typeof GetInfor>
//reducer

const INITIAL_STATE : any=[];
export function GetInfoReducer(state=INITIAL_STATE,action : State )
{
    if(action.type ===GETINFOR)
    {
        return action.payload
    }
    return state;
}