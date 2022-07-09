import { useRef } from 'react'

import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { getColorCode } from '../../constants/emailSignature'

import IconButton from '@mui/material/IconButton'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

import styles from '../../styles/EmailSignature.module.css'

const Output = ({ values }) => {
    const resultRef = useRef(null)

    const copy = useCopyToClipboard()

    const handleClick = async (e) => {
        e.preventDefault()

        copy(resultRef, true)
    }

    return (
        <>
            <div className={styles.output}>
                <div style={{ fontFamily: '"Montserrat", sans-serif' }} ref={resultRef}>
                    <div style={{ color: getColorCode(values), fontWeight: 'bold', fontSize: '20px', fontFamily: '"Montserrat", sans-serif' }}>{values.fullName}</div>
                    <div style={{ fontWeight: 'bold', fontSize: '16px', fontFamily: '"Montserrat", sans-serif' }}>{values.title}</div>
                    <div style={{ marginBottom: '16px' }}>
                        <div>
                            <span style={{ fontSize: '14px', fontFamily: '"Montserrat", sans-serif' }}>Email: </span>
                            <a href={`mailto:${values.email}`} style={{ color: getColorCode(values), fontSize: '14px', textDecoration: 'none', fontFamily: '"Montserrat", sans-serif' }}>
                                {values.email}
                            </a>
                        </div>

                        <div style={{ fontSize: '14px', fontFamily: '"Montserrat", sans-serif' }}>Phone: {values.phone}</div>

                        {values.cellPhone && <div style={{ fontSize: '14px', fontFamily: '"Montserrat", sans-serif' }}>Cell: {values.cellPhone}</div>}
                        {values.fax && <div style={{ fontSize: '14px', fontFamily: '"Montserrat", sans-serif' }}>Fax: {values.fax}</div>}
                        {values.website && (
                            <div>
                                <span style={{ fontSize: '14px', fontFamily: '"Montserrat", sans-serif' }}>Web: </span>
                                <a href={values.website} style={{ color: getColorCode(values), fontSize: '14px', textDecoration: 'none', fontFamily: '"Montserrat", sans-serif' }}>
                                    {values.website}
                                </a>
                            </div>
                        )}
                    </div>

                    <div style={{ color: getColorCode(values), fontSize: '14px', fontFamily: '"Montserrat", sans-serif' }}>{values.companyName} </div>
                    <div style={{ color: getColorCode(values), fontSize: '14px', fontFamily: '"Montserrat", sans-serif' }}> {values.department}</div>
                    <div style={{ color: getColorCode(values), fontSize: '14px', fontFamily: '"Montserrat", sans-serif' }}>
                        {values.address} {values.cityState} {values.zipCode}
                    </div>
                </div>
                <IconButton className={styles.copy} style={{ position: 'absolute' }} aria-label='copy email signature' onClick={handleClick}>
                    <ContentCopyIcon color='primary' />
                </IconButton>
            </div>
        </>
    )
}

export default Output
