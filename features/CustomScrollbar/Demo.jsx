import { generateScrollbarStrings } from '../../utilities/generateScrollbarStrings'

const Demo = ({ value }) => {
    const { DemoBox } = generateScrollbarStrings(value)
    return (
        <DemoBox>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus beatae asperiores recusandae nesciunt. Suscipit nesciunt nulla pariatur non! Porro laborum culpa veniam. Corrupti,
                excepturi commodi est voluptas itaque unde ipsum!
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus beatae asperiores recusandae nesciunt. Suscipit nesciunt nulla pariatur non! Porro laborum culpa veniam. Corrupti,
                excepturi commodi est voluptas itaque unde ipsum!
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus beatae asperiores recusandae nesciunt. Suscipit nesciunt nulla pariatur non! Porro laborum culpa veniam. Corrupti,
                excepturi commodi est voluptas itaque unde ipsum!
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus beatae asperiores recusandae nesciunt. Suscipit nesciunt nulla pariatur non! Porro laborum culpa veniam. Corrupti,
                excepturi commodi est voluptas itaque unde ipsum!
            </p>
        </DemoBox>
    )
}

export default Demo
