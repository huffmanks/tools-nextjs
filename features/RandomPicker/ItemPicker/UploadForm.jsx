import { Button, Grid, Stack } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Counter from '../../../components/common/Counter'
import FieldsetContainer from '../FieldsetContainer'

const UploadForm = ({ fileRef, values, handleChange, handleFileUpload, handleDecrease, handleIncrease }) => {
    return (
        <Grid item xs={12} md={7}>
            <div>
                <FieldsetContainer
                    title='Result options'
                    size='large'
                    mb={0}
                    isFullWidth
                    helperText={`There will be ${values.total} item${values.total > 1 ? 's' : ''} selected from the spreadsheet.`}
                    sx={{ marginBottom: 0 }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'start', sm: 'center' }} gap={2} mb={2}>
                        <Counter values={values} handleChange={handleChange} handleDecrease={handleDecrease} handleIncrease={handleIncrease} />

                        <Button sx={{ padding: '13px 21px', fontSize: '1rem' }} component='label' variant='outlined' size='large' aria-label='upload file' endIcon={<CloudUploadIcon />}>
                            Upload
                            <input
                                ref={fileRef}
                                type='file'
                                hidden
                                onChange={handleFileUpload}
                                accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                            />
                        </Button>

                        {values?.fileName && <div>{values.fileName}</div>}
                    </Stack>
                </FieldsetContainer>
            </div>
        </Grid>
    )
}

export default UploadForm
