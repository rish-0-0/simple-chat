export const JUST_JOINED = 'JUST_JOINED';
export const justJoined = (bool) => {
    return {
        type: JUST_JOINED,
        payload: {
            success:bool,
        },
    };
};