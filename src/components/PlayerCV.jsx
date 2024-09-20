import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import '/src/Css/PlayerCV.css';

// Sæt workerSrc til den korrekte version
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js`;

const PlayerCV = () => {
    const [numPages, setNumPages] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div>
            <h1>Welcome to the About Page</h1>
            <p>Your journey begins here. Explore, learn, and enjoy!</p>

            <div className="pdf-container">
                <Document
                    file="/assets/misc/Opgave_Udvikling_af_et_Ejendomsselskabs_Administrationssystem.pdf"
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))}
                </Document>
            </div>
        </div>
    );
};

export default PlayerCV;
