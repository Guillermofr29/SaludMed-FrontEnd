export const validateOnlyString = (name: string): string | null => {
    const regex = /^[a-zA-ZÁ-ÿ\u00f1\u00d1\s]+$/;
    if (!regex.test(name.trim())) {
        return 'Solo puede contener letras y espacios';
    }
    return null;
};

export const validateEmail = (email: string): string | null => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
        return 'El correo electrónico no tiene un formato válido';
    }
    return null;
};

export const validatePhoneNumber = (phoneNumber: string): string | null => {
    const regex = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\s-]{10,14}$/;
    if (!regex.test(phoneNumber)) {
        return 'Ingresa un número de teléfono válido';
    }
    return null;
};

export const validateWeight = (weight: number): string | null => {
    const regex = /^\d+(\.\d{1,2})?$/;
    if (!regex.test(weight.toString()) || weight <= 0) {
        return 'El peso debe ser positivo y tener hasta dos decimales';
    }
    return null;
};

export const validateHeight = (height: number): string | null => {
    const regex = /^\d+(\.\d{1,2})?$/;
    if (!regex.test(height.toString()) || height <= 0) {
        return 'La estatura debe ser positiva (en metros) y tener hasta dos decimales';
    }
    return null;
};

export const validateAge = (age: number): string | null => {
    if (age <= 0 || age > 125) {
        return 'La edad debe ser mayor que 0 y menor o igual a 125';
    }
    return null;
};
