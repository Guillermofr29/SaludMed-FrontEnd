export const validateName = (name: string): boolean => {
    // Solo letras y espacios permitidos
    const regex = /^[a-zA-ZÁ-ÿ\u00f1\u00d1\s]+$/;
    return regex.test(name);
};

export const validateEmail = (email: string): boolean => {
    // Validación de formato de email
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};
