export const APPEND_MESSAGE = 'APPEND_MESSAGE';
export const appendMessage = (data) => {
    return {
        type:APPEND_MESSAGE,
        payload: {
            ...data,
        },
    };
};