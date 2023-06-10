import { generateScrollbarStrings } from '../../utilities/generateScrollbarStrings'

const Demo = ({ values, colors, children }) => {
    const { DemoBox } = generateScrollbarStrings(values, colors)
    return <DemoBox>{children}</DemoBox>
}

export default Demo
