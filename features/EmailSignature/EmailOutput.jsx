import { useRef } from 'react'

import { useGlobalState } from '../../hooks/useContext'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'

import { getColorCode } from './getEmailThemeOptions'

import { Box } from '@mui/material'

import IconButton from '@mui/material/IconButton'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const EmailOutput = ({ values }) => {
    const resultRef = useRef(null)

    const { addToast } = useGlobalState()
    const [copy] = useCopyToClipboard(true, true)

    const handleCopy = async () => {
        const copySuccess = await copy(resultRef.current)

        if (copySuccess) {
            addToast('Copied to clipboard!')
        }
    }

    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    maxWidth: 375,
                    marginBottom: 6,
                    padding: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    color: 'background.default',
                    borderRadius: 1.5,
                }}>
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
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        transform: 'translate(-10px, 10px)',
                        '&:hover': {
                            backgroundColor: getColorCode(values),
                            '& svg': {
                                color: '#fff',
                            },
                        },
                        '& svg': {
                            color: getColorCode(values),
                        },
                    }}
                    aria-label='copy email signature'
                    onClick={handleCopy}>
                    <ContentCopyIcon />
                </IconButton>
            </Box>
        </>
    )
}

export default EmailOutput
