import ColorItem from './ColorItem'

import styles from '../../styles/ColorItems.module.css'

const ColorItems = ({ darkest, darker, original, lighter, lightest }) => {
    return (
        <div className={styles['color-items']}>
            <ColorItem colorValue={lightest} />
            <ColorItem colorValue={lighter} />
            <ColorItem colorValue={original} />
            <ColorItem colorValue={darker} />
            <ColorItem colorValue={darkest} />
        </div>
    )
}

export default ColorItems
