import { BsChevronDown } from "react-icons/bs";

function TableMobileView(props: any) {
  return (
    <>
      <div className="tableCell row d-flex justify-content-center mt-2 border border-2 border-secondary rounded">
        <div className="row m-0 p-0 border-bottom border-2 border-secondary">
          <TableCell content={props.teamPosition.rank} />
          <TableCellImage content={props.teamPosition.team.logo} />
          <TableCell name={true} content={props.teamPosition.team.name} />
          <TableCell last={true} content={props.teamPosition.points} />
          <div className="col-2 d-flex justify-content-center align-items-center">
            <button
              className="btn-sm btn-outline-ghost btn_collapse collapsed"
              data-bs-toggle="collapse"
              data-bs-target={"#" + "collapse-"+props.teamPosition.rank}
              aria-expanded="false"
              aria-controls="collapsable"
              style={{
                background: "none",
                border: "none",
                color: "whitesmoke",
              }}
            >
              <BsChevronDown />
            </button>
          </div>
        </div>

        <div id={"collapse-"+props.teamPosition.rank} className="collapse">
          <div
            id=""
            className="row small d-flex justify-content-center align-items-center mt-2 mb-2"
          >
            <div className="row text-secondary  d-flex justify-content-between align-items-center small">
              <div className="col-1 d-flex justify-content-center align-items-center">
                <strong>P</strong>
              </div>
              <div className="col-1 d-flex justify-content-center align-items-center">
                <strong>W</strong>
              </div>
              <div className="col-1 d-flex justify-content-center align-items-center">
                <strong>D</strong>
              </div>
              <div className="col-1 d-flex justify-content-center align-items-center">
                <strong>L</strong>
              </div>
              <div className="col-1 d-flex justify-content-center align-items-center">
                <strong>+</strong>
              </div>
              <div className="col-1 d-flex justify-content-center align-items-center">
                <strong>-</strong>
              </div>
              <div className="col-1 d-flex justify-content-center align-items-center">
                <strong>+/-</strong>
              </div>
            </div>

            <div className="row d-flex justify-content-between align-items-center small mt-1">
              <div className="col-1 d-flex justify-content-center align-items-center">
                {props.teamPosition.all.played}
              </div>
              <div className="col-1 d-flex justify-content-center align-items-center">
                {props.teamPosition.all.win}
              </div>
              <div className="col-1 d-flex justify-content-center align-items-center">
                {props.teamPosition.all.draw}
              </div>
              <div className="col-1 d-flex justify-content-center align-items-center">
                {props.teamPosition.all.lose}
              </div>
              <div className="col-1 d-flex justify-content-center align-items-center">
                {props.teamPosition.all.goals.for}
              </div>
              <div className="col-1 d-flex justify-content-center align-items-center">
                {props.teamPosition.all.goals.against}
              </div>
              <div className="col-1 d-flex justify-content-center align-items-center">
                {props.teamPosition.all.goals.for -
                  props.teamPosition.all.goals.against}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface props {
  content?: string | number;
  imgHeightAndWidth?: string;
  last?: boolean;
  name?: boolean;
}

function TableCell(prop: props) {
  return (
    <>
      <div
        className={
          prop.last
            ? "border-end border-secondary col-2 d-flex align-items-center justify-content-center bg-black bg-opacity-50"
            : prop.name
            ? "text-center border-end border-secondary col-4 d-flex align-items-center justify-content-center"
            : "border-end border-secondary col-2 d-flex align-items-center justify-content-center"
        }
      >
        <span>{prop.content}</span>
      </div>
    </>
  );
}

function TableCellImage(prop: props) {
  return (
    <>
      <div className="border-end border-secondary col-2 d-flex align-items-center justify-content-center">
        <img src={prop.content?.toString()} />
      </div>
    </>
  );
}

export default TableMobileView;
