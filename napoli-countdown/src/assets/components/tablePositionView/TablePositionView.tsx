import "./TablePositionViewStyle.css"

function TablePositionView(props: any) {

    return (
        <>
        <div className="tablePosition">
        <TableCell content={props.teamPosition.rank} />
            <TableCellImage imgHeightAndWidth="30px" content={props.teamPosition.team.logo} />
            <TableCell name={true} content={props.teamPosition.team.name} />
            <TableCell content={props.teamPosition.all.played}/>
            <TableCell content={props.teamPosition.all.win}/>
            <TableCell content={props.teamPosition.all.draw}/>
            <TableCell content={props.teamPosition.all.lose}/>
            <TableCell content={props.teamPosition.all.goals.for}/>
            <TableCell content={props.teamPosition.all.goals.against}/>
            <TableCell content={props.teamPosition.all.goals.for - props.teamPosition.all.goals.against}/>
            <TableCell last={true} content={props.teamPosition.points}/>
        </div>
        </>
    )
}

interface props {
    content?: string | number,
    imgHeightAndWidth?: string,
    last?: boolean
    name?: boolean
  }
   

function TableCell(prop: props) {

    return (
        <>
        <div className={prop.last ? "lastTableCell" : prop.name ? "tableCell_name" : "tableCell"}>
            <p>{prop.content}</p>
        </div>
        </>
    )
}

function TableCellImage(prop: props) {

    return (
        <>
        <div className="tableCell">
        <img width={prop.imgHeightAndWidth} height={prop.imgHeightAndWidth} src={prop.content?.toString()} />
        </div>
        </>
    )
}

export default TablePositionView;