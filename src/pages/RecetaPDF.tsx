import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import logo from '../images/logo/logo.png';
import LogoLogin from '../images/logo/logoLogin.png';

Font.register({
    family: 'FontAwesome',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/webfonts/fa-solid-900.ttf'
});

const formatFecha = (fecha: string) => {
    const [year, month, day] = fecha.split('-');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    const formattedDay = String(date.getDate()).padStart(2, '0');
    const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
    const formattedYear = date.getFullYear();
    return `${formattedDay}-${formattedMonth}-${formattedYear}`;
};

const styles = StyleSheet.create({
    page: { 
        padding: 30,
        fontFamily: 'Helvetica'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottom: '1 solid #E4E4E4',
        paddingBottom: 10,
    },
    spanNoCita: {
        color: 'red'
    },
    leftColumn: {
        width: '60%',
    },
    rightColumn: {
        width: '40%',
        textAlign: 'right',
        fontSize: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        marginTop: 10,
        color: '#063D54'
    },
    section: { 
        marginVertical: 10, 
        paddingHorizontal: 10 
    },
    subTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 5,
        color: '#063D54'
    },
    text: {
        fontSize: 12,
        marginVertical: 2,
        color: '#333333'
    },
    text2: {
        fontSize: 12,
        marginVertical: 2,
        color: '#e70000'
    },
    medicamento: {
        fontSize: 12,
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottom: '1 solid #E4E4E4'
    },
    info: {
        marginTop: 20,
        borderTop: '1 solid #E4E4E4',
        paddingTop: 10,
        fontSize: 10,
        textAlign: 'center',
        color: '#666666'
    },
    signature: {
        fontSize: 12,
        marginTop: 80,
        textAlign: 'center',
        padding: 10,
    },
    footer: {
        backgroundColor: '#063D54',
        color: 'white',
        padding: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 10
    },
    footerText: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    footerItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10
    },
    icon: {
        fontFamily: 'FontAwesome',
        marginRight: 5
    }
});

const RecetaPDF = ({ formData, formDataPrescription, medicamentos, doctor }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <View style={styles.leftColumn}>
                    <Image src={logo} style={{ width: 150, height: 50 }} />
                    <Text style={styles.subTitle}>Dr. {formData.nombreMedico}</Text>
                    <Text style={styles.text}>Especialidad: {doctor.especialidad}</Text>
                    <Text style={styles.text}>Cédula Profesional: {doctor.cedulaProfesional}</Text>
                </View>
                <View style={styles.rightColumn}>
                    <Text style={styles.text2}>No. de Cita:{formData.iD_Cita}</Text>
                    <Text style={styles.text}>Fecha: {formatFecha(formData.fecha)}</Text>
                    <Text style={styles.text}>Hora: {formData.hora} hrs</Text>
                    <Text style={styles.text}>Motivo: {formData.motivo}</Text>
                </View>
            </View>

            <Image style={{ position: 'absolute', opacity: 0.1, top: '30%', left: '32%', width: '50%' }} src={LogoLogin} />

            <View style={styles.section}>
                <Text style={styles.subTitle}>Datos del Paciente</Text>
                <Text style={styles.text}>Nombre: {formData.nombrePaciente}     Sexo: {formData.sexo}</Text>
                <Text style={styles.text}>Edad: {formData.edad} años</Text>
                <Text style={styles.text}>Estatura: {formData.estatura} mts        Peso: {formData.peso} kg</Text>
                <Text style={styles.text}>Diagnóstico: {formDataPrescription.Diagnostico}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subTitle}>Medicamentos recetados</Text>
                {medicamentos.map((med, index) => (
                    <View key={index} style={styles.medicamento}>
                        <Text style={styles.text}>{index + 1}) {med.nombre} - {med.dosis} - {med.cantidad}</Text>
                        <Text style={styles.text}>Indicaciones: {med.frecuencia}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.subTitle}>Recomendaciones generales</Text>
                <Text style={styles.text}>{formDataPrescription.Recomendaciones}</Text>
            </View>

            <View style={styles.signature}>
                <Text>_______________________________</Text>
                <Text style={{paddingTop: '5px'}}>Dr. {formData.nombreMedico}</Text>
            </View>

            <Text style={styles.info}>
                En caso de reacción alérgica, suspenda los medicamentos y consulte a su médico inmediatamente
            </Text>

            <View style={styles.footer}>
                <View style={styles.footerText}>
                    <View style={styles.footerItem}>
                        <Text style={styles.icon}>&#xf3c5;</Text>
                        <Text>{doctor.direccion}</Text>
                    </View>
                    <View style={styles.footerItem}>
                        <Text style={styles.icon}>&#xf095;</Text>
                        <Text> Tel: {doctor.telefonoClinica}</Text>
                    </View>
                    <View style={styles.footerItem}>
                        <Text style={styles.icon}>&#xf0e0;</Text>
                        <Text> Email: {doctor.correoClinica}</Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

export default RecetaPDF;
