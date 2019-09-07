export const NOT_TYPING='NOT_TYPING';
export const notTyping = (data) => {
    return {
        type:NOT_TYPING,
        payload: {
            ...data,
        },
    };
};