export const appendMessage = (data) => {
    console.log("called123");
    return {
        type:'APPEND_MESSAGE',
        payload: {
            ...data,
        },
    };
};