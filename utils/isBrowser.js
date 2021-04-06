export default () => {
    return (
        typeof window !== "undefined" &&
        window.document &&
        typeof window.document.createElement === "function"
    );
};
