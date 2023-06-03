import { FC } from 'react'
import { Document, Page, Text, Image, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
    page: {
        display: "flex",
        flexDirection: "column",
        paddingHorizontal: "10%",
        paddingVertical: "5%"
    },
    srcImage: {
        height: "200px",
        width: "100%",
    },
    title: {
        fontSize: "40px",
        textAlign: "center"
    }

})

// TODO: Finish setting up the pdf with table and dividers
export const PDFFile: FC<{ chartImage: string }> = ({ chartImage }) => {
    return (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.title}></Text>
                

                <Image style={styles.srcImage} src={chartImage} />
            </Page>
        </Document>
    )
}
