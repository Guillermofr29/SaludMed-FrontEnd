import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { padding: 30 },
    title: { fontSize: 24, marginBottom: 10 },
    section: { margin: 10, padding: 10, flexGrow: 1 },
});

const RecetaPDF = ({ formData, formDataPrescription, medicamentos }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Receta Médica</Text>
            <View style={styles.section}>
                <Text>Paciente: {formData.nombrePaciente}</Text>
                <Text>Médico: {formData.nombreMedico}</Text>
                <Text>Diagnóstico: {formDataPrescription.Diagnostico}</Text>
                <Text>Fecha Inicio: {formDataPrescription.FechaInicio}</Text>
                <Text>Fecha Fin: {formDataPrescription.FechaFin}</Text>
            </View>
            <View style={styles.section}>
                <Text>Medicamentos:</Text>
                {medicamentos.map((med, index) => (
                    <View key={index}>
                        <Text>{med.nombre}</Text>
                        <Text>Dosis: {med.dosis}</Text>
                        <Text>Cantidad: {med.cantidad}</Text>
                        <Text>Frecuencia: {med.frecuencia}</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default RecetaPDF;