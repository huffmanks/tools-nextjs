import { generateScrollbarStrings } from '../../utilities/generateScrollbarStrings'

const DummyText = () => {
    return (
        <>
            <p style={{ marginBottom: 30 }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae nobis nisi ratione vitae praesentium optio iste sapiente, qui temporibus, quibusdam quo voluptas. Mollitia numquam
                repellendus hic, quam quidem saepe at cum harum impedit doloribus eum dolorem consectetur eaque accusamus enim maxime magnam perferendis consequatur.
            </p>
            <ul style={{ marginBottom: 30, listStyle: 'inside', paddingLeft: 15 }}>
                <li>
                    Tempore enim eligendi voluptatum eius labore, sunt commodi dolore aliquid! Eveniet odit quos pariatur laboriosam explicabo aliquam. Consequuntur labore dolorum iure fuga ipsum
                    sequi accusantium dolorem ex?
                </li>
                <li>Voluptatum libero debitis eum tempore reiciendis ut quae similique optio laborum dicta rerum quas, fuga alias dolorem, ratione a repellendus autem, cumque labore pariatur!</li>
                <li>
                    Quibusdam incidunt nam ad dolores blanditiis tenetur dolorum aut atque nulla! Facilis molestias harum praesentium sunt necessitatibus amet rerum, odio laborum, vitae totam commodi
                    veritatis libero! Quibusdam consequatur nemo neque nobis et dignissimos sunt!
                </li>
            </ul>
            <blockquote style={{ marginBottom: 30, padding: '15px 30px', borderLeft: '3px solid #5b21b6' }}>
                “Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora laudantium modi architecto? Porro sapiente repellat aliquid praesentium magni vitae ipsam error quis dolorum. Nulla
                sit saepe facilis quidem amet.”
            </blockquote>
        </>
    )
}

const Demo = ({ values, colors }) => {
    const { DemoBox } = generateScrollbarStrings(values, colors)
    return (
        <>
            <DemoBox
                sx={{
                    height: 200,
                    marginBottom: 4,
                    padding: 4,
                    whiteSpace: values.axis === 'x' ? 'nowrap' : 'normal',
                    overflowX: values.axis === 'x' ? 'scroll' : 'hidden',
                    overflowY: values.axis === 'y' ? 'scroll' : 'hidden',
                }}>
                <DummyText />
            </DemoBox>
        </>
    )
}

export default Demo
