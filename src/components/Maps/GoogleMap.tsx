const GoogleMap = () => {
    return (
        <div className="w-full h-0 pb-[75%] relative">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11505.690773695907!2d-86.84400034858375!3d21.047646519591957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4e81c385c4677f%3A0x539479cfc0929edb!2sUniversidad%20Tecnol%C3%B3gica%20de%20Canc%C3%BAn%2C!5e0!3m2!1ses-419!2smx!4v1721179773632!5m2!1ses-419!2smx"
                className="absolute top-0 left-0 w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
};

export default GoogleMap;