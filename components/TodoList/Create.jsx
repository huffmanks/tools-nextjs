import { Button, TextField } from '@mui/material'

const Create = ({ title, item, items, handleChange, handleAddItem, handleSubmit }) => {
    return (
        <>
            <TextField variant='outlined' label='List Title' placeholder='Shopping List' name='title' value={title} onChange={handleChange} autoComplete='none' />
            <div>
                <TextField variant='outlined' label='Add Item' placeholder='Carrots' name='item' value={item} onChange={handleChange} autoComplete='none' />
                <Button variant='contained' onClick={handleAddItem}>
                    Add
                </Button>
            </div>

            {items?.map((it) => (
                <div key={it.id}>{it.text}</div>
            ))}
            <Button variant='contained' type='submit' onClick={handleSubmit}>
                Create
            </Button>
        </>
    )
}

export default Create
