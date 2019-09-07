export const IS_TYPING = 'IS_TYPING';
export const isTyping = (data) => {
    return {
        type:IS_TYPING,
        payload: {
            ...data,
        },
    };
};