export const appendMessage = (data) => {
    return {
        type:'APPEND_MESSAGE',
        payload: {
            ...data,
        },
    };
};