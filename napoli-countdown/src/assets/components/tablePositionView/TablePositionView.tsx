function TablePositionView(props: any) {

    return (
        <>
        <div className="row d-flex justify-content-center mt-1">
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
        <div className={prop.last ? "col-1 d-flex align-items-center justify-content-center bg-black bg-opacity-50" : prop.name ? "col-2 d-flex align-items-center justify-content-start" :  "col-1 d-flex align-items-center justify-content-center"}>
            <span>{prop.content}</span>
        </div>
        </>
    )
}

function TableCellImage(prop: props) {

    return (
        <>
        <div className="col-1 d-flex align-items-center justify-content-center">
        <img width={prop.imgHeightAndWidth} height={prop.imgHeightAndWidth} src={prop.content?.toString()} />
        </div>
        </>
    )
}

export default TablePositionView;