function TableMobileView(props: any) {

    return (
        <>
        <div className="tableCell row d-flex justify-content-center mt-2 border border-2 border-secondary rounded">
        <TableCell content={props.teamPosition.rank} />
            <TableCellImage content={props.teamPosition.team.logo} />
            <TableCell name={true} content={props.teamPosition.team.name}/>
          {/*   <TableCell content={props.teamPosition.all.played}/>
            <TableCell content={props.teamPosition.all.win}/>
            <TableCell content={props.teamPosition.all.draw}/>
            <TableCell content={props.teamPosition.all.lose}/>
            <TableCell content={props.teamPosition.all.goals.for}/>
            <TableCell content={props.teamPosition.all.goals.against}/>
            <TableCell content={props.teamPosition.all.goals.for - props.teamPosition.all.goals.against}/> */}
            <TableCell last={true} content={props.teamPosition.points}/>
            <div className="col-2 d-flex justify-content-center align-items-center">
            <button className="btn-sm btn-primary">Button</button>
            </div>
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
        <div className={prop.last ? "border-end border-secondary col-2 d-flex align-items-center justify-content-center bg-black bg-opacity-50" : prop.name ? "text-center border-end border-secondary col-4 d-flex align-items-center justify-content-center" :  "border-end border-secondary col-2 d-flex align-items-center justify-content-center"}>
            <span>{prop.content}</span>
        </div>
        </>
    )
}

function TableCellImage(prop: props) {

    return (
        <>
        <div className="border-end border-secondary col-2 d-flex align-items-center justify-content-center">
        <img src={prop.content?.toString()} />
        </div>
        </>
    )
}

export default TableMobileView;