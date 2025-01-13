import { useEffect, useState } from "react";
import TablePositionView from "./assets/components/tablePositionView/TablePositionView";
import Footer from "./assets/components/footer/Footer";
import * as allSeasonTest from "./test/allSeasonData.json";
import * as fixtureData from "./test/fixtureData.json";
import "./index.css";
import MediaQuery from "react-responsive";
import TableMobileView from "./assets/components/mobile/tableMobileView/TableMobileView";

interface statKeeper {
  gamesInTotal: number;
  firstTeam_playedGames: number;
  firstTeam_gamesLeft: number;
  diffPoints: number;
  maxPointsForSec: number;
  pointsToReachTotal: number;
  pointsToReachLeft: number;
  numberOfWins: number;
  numberOfDraws: number;
}

// todo: need to add logic for remaining second teams games to play
function App() {
  const [allSeasonData, setAllSeasonData] = useState<any>();
  const [standings, setStandings] = useState<any>();
  const [statKeeper, setStatKeeper] = useState<statKeeper>();
  const [showCompleteStandings, setShowCompleteStandings] =
    useState<boolean>(false);
  const [nextFixtures, setNextFixtures] = useState<any>();

  useEffect(() => {
    fetchCurrentSerieAStandings();

    fetchNextFixturesToCome();

    /**
     * for test purposes
     */

    //setAllSeasonData(allSeasonTest);
    //setNextFixtures(fixtureData);
  }, []);

  useEffect(() => {
    if (allSeasonData !== undefined) {
      setStandings(allSeasonData.response[0].league.standings[0]);
    }
  }, [allSeasonData]);

  useEffect(() => {
   /*  if (standings !== undefined) {
      let _statKeeperObj: statKeeper = {
        gamesInTotal: standings.length * 2 - 2,
        firstTeam_playedGames: standings[0].all.played,
        firstTeam_gamesLeft: standings.length * 2 - 2 - standings[0].all.played,
        diffPoints: standings[0].points - standings[1].points,
        maxPointsForSec:
          standings[1].points +
          (standings.length * 2 - 2 - standings[1].all.played) * 3,
        pointsToReachTotal:
          1 +
          (standings[1].points +
            (standings.length * 2 - 2 - standings[1].all.played) * 3),
        pointsToReachLeft:
          1 +
          (standings[1].points +
            (standings.length * 2 - 2 - standings[1].all.played) * 3) -
          standings[0].points,
        numberOfWins: Math.floor(
          (1 +
            (standings[1].points +
              (standings.length * 2 - 2 - standings[1].all.played) * 3) -
            standings[0].points) /
            3
        ),
        numberOfDraws:
          (1 +
            (standings[1].points +
              (standings.length * 2 - 2 - standings[1].all.played) * 3) -
            standings[0].points) %
          3,
      }; */
      if (standings !== undefined) {
        const totalGames = standings.length * 2 - 2;
        const firstTeamPlayed = standings[0].all.played;
        const secondTeamPlayed = standings[1].all.played;
        const firstTeamGamesLeft = totalGames - firstTeamPlayed;
        const secondTeamMaxPoints =
          standings[1].points + (totalGames - secondTeamPlayed) * 3;
        const pointsNeeded =
          1 + secondTeamMaxPoints - standings[0].points; // Points needed to ensure championship
      
        // Cap pointsNeeded to what is achievable with games left
        const achievablePoints = Math.min(pointsNeeded, firstTeamGamesLeft * 3);
      
        let _statKeeperObj: statKeeper = {
          gamesInTotal: totalGames,
          firstTeam_playedGames: firstTeamPlayed,
          firstTeam_gamesLeft: firstTeamGamesLeft,
          diffPoints: standings[0].points - standings[1].points,
          maxPointsForSec: secondTeamMaxPoints,
          pointsToReachTotal: 1 + secondTeamMaxPoints,
          pointsToReachLeft: pointsNeeded,
          numberOfWins: Math.floor(achievablePoints / 3),
          numberOfDraws: achievablePoints % 3,
        };
            

      setStatKeeper(_statKeeperObj);
    }
  }, [standings]);

  return (
    <>
      <div
        className="container mt-5 parentContainer"
        style={{ maxWidth: "90vw" }}
      >
        {allSeasonData && (
          <div className="row text-center titleContainer">
            <div className="col-12">
              <strong>
                ROAD TO SCUDETTO {allSeasonData.response[0].league.season}/
                {parseInt(allSeasonData.response[0].league.season as string) +
                  1}
              </strong>
            </div>
          </div>
        )}
        <div className="container-fluid mt-5 statContainer">
          {standings && (
            <div>
              {statKeeper?.pointsToReachLeft &&
                statKeeper.pointsToReachLeft <= 0 && (
                  <div className="col-12 text-center mb-5">
                    <h1 id="congrats">
                      Congratulations to {standings[0].team.name} for the WIN !
                    </h1>
                  </div>
                )}
              {statKeeper && (
                <>
                <div className="row">
                  <div className="col-4 d-flex align-items-center justify-content-start ">
                    <a
                      className="logo_link"
                      href="https://www.google.com/search?q=serie+a&oq=serie+a&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGDzSAQc3ODRqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8#wptab=si:ACC90nyZc0kQnwqEuA-yLPm2QDGaKhGaS4Z8p5LgAbzYfCuxHF9pI5HMbpRaboDlgYmSLxgtd4d9Lukea_lB4gZC_JJgW5v8zBQ802OTXppskvCjKFJ6e228R-6H-hX6bqvnxGYAznEuf9Plp3BEnfd3fMs1NxS2cfzykzwR9pMIuOcj1MT91jM%3D"
                    >
                      <img className="logo" src={standings[0].team.logo}></img>
                    </a>
                  </div>

                  <div className="col-8 ">
                    <div
                      className="row mb-2 d-flex justify-content-center align-items-center  pb-2"
                      style={{ minHeight: "6vw" }}
                    >
                      <div className="col-6">
                        <strong>Games Yet To Play</strong>
                      </div>
                      <div className="col-6 d-flex align-items-center justify-content-end">
                        <strong>{statKeeper.firstTeam_gamesLeft}</strong>
                      </div>
                    </div>
                    <div
                      className="row mb-2 d-flex justify-content-center align-items-center  pb-2"
                      style={{ minHeight: "6vw" }}
                    >
                      <div className="col-6  d-flex align-items-center">
                        <strong>Wins Needed</strong>
                      </div>
                      <div className="col-6  d-flex align-items-center justify-content-end">
                        <strong>
                          {statKeeper.numberOfWins < 0
                            ? 0
                            : statKeeper.numberOfWins}
                        </strong>
                      </div>
                    </div>
                    <div
                      className="row mb-2 d-flex justify-content-center align-items-center  pb-2"
                      style={{ minHeight: "6vw" }}
                    >
                      <div className="col-6  d-flex align-items-center">
                        <strong>Draws Needed</strong>
                      </div>
                      <div className="col-6  d-flex align-items-center justify-content-end">
                        <strong>
                          {statKeeper.numberOfDraws < 0
                            ? 0
                            : statKeeper.numberOfDraws}
                        </strong>
                      </div>
                    </div>
                    {nextFixtures &&
                      statKeeper.pointsToReachLeft &&
                      statKeeper.pointsToReachLeft >= 0 && (
                        
                        <div
                          className="row mb-2 d-flex justify-content-center align-items-center  pb-2"
                          style={{ minHeight: "6vw" }}
                        >
                          
                          <div className="col-6 d-flex align-items-center">
                            <strong>Decisive Game</strong>
                          </div>
                          <div className="col-6">
                            <div className="row">
                              <div className="col-12 text-end">
                                <small>
                                  <strong>
                                    {new Date(
                                      nextFixtures.response[
                                        statKeeper.numberOfWins +
                                          statKeeper.numberOfDraws -
                                          1
                                      ].fixture.date
                                    ).toLocaleDateString()}
                                  </strong>
                                </small>
                              </div>
                              <div className="col-12">
                                <div className="mt-0 row d-flex align-items-center justify-content-end">
                                  <div className=" col-5 pe-0 d-flex align-items-center justify-content-end">
                                    <img
                                      style={{ marginRight: "5px" }}
                                      className="dg_home:logo"
                                      src={
                                        nextFixtures.response[
                                          statKeeper.numberOfWins +
                                            statKeeper.numberOfDraws -
                                            1
                                        ].teams.home.logo
                                      }
                                    />

                                    <strong>
                                      {new String(
                                        nextFixtures.response[
                                          statKeeper.numberOfWins +
                                            statKeeper.numberOfDraws -
                                            1
                                        ].teams.home.name
                                      ).slice(0, 3)}
                                    </strong>
                                  </div>

                                  <div className="dg_secondTeam col-6 d-flex align-items-center justify-content-end">
                                    <strong>
                                      {new String(
                                        nextFixtures.response[
                                          statKeeper.numberOfWins +
                                            statKeeper.numberOfDraws -
                                            1
                                        ].teams.away.name
                                      ).slice(0, 3)}
                                    </strong>

                                    <img
                                      style={{ marginLeft: "5px" }}
                                      className="dg_away_logo"
                                      src={
                                        nextFixtures.response[
                                          statKeeper.numberOfWins +
                                            statKeeper.numberOfDraws -
                                            1
                                        ].teams.away.logo
                                      }
                                    />
                                  </div>
                                </div>
                  
                              </div>
                            </div>
                          </div>
                        </div>
          
                      )}
                  </div>
                  </div>
                </>
              )}
            </div>
          )}

          {
            // display here the first and second place
          }

          <MediaQuery minWidth={720}>
            {standings && (
              <>
                <div className="container-fluid mt-5 standingsContainer">
                  <div className="row d-flex justify-content-center ">
                    <div className="standingsHeader border-bottom border-secondary row d-flex justify-content-center  mb-1 p-0 pb-1 ">
                      <div
                        className="col-1 d-flex align-items-center justify-content-center"
                        style={{ minHeight: "3vw" }}
                      >
                        Pos.
                      </div>
                      <div className="col-1 d-flex align-items-center justify-content-center"></div>
                      <div className="col-2 d-flex align-items-center justify-content-center">
                        N
                      </div>
                      <div className="col-1 d-flex align-items-center justify-content-center">
                        P
                      </div>
                      <div className="col-1 d-flex align-items-center justify-content-center">
                        W
                      </div>
                      <div className="col-1 d-flex align-items-center justify-content-center">
                        D
                      </div>
                      <div className="col-1 d-flex align-items-center justify-content-center">
                        L
                      </div>
                      <div className="col-1 d-flex align-items-center justify-content-center">
                        G+
                      </div>
                      <div className="col-1 d-flex align-items-center justify-content-center">
                        G-
                      </div>
                      <div className="col-1 d-flex align-items-center justify-content-center">
                        G+/-
                      </div>
                      <div className="col-1 d-flex align-items-center justify-content-center">
                        Pts.
                      </div>
                    </div>

                    <div>
                      <TablePositionView teamPosition={standings[0]} />
                    </div>
                    <div>
                      <TablePositionView teamPosition={standings[1]} />
                    </div>
                    {showCompleteStandings && (
                      <>
                        {standings.map((standing: any) => (
                          <div key={standing.rank}>
                            {standing.rank >= 3 ? (
                              <div>
                                <TablePositionView teamPosition={standing} />
                              </div>
                            ) : (
                              " "
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </MediaQuery>
          <MediaQuery maxWidth={720}>
            {standings && (
              <>
                <div className="container-fluid mt-5">
                  <div className="row d-flex justify-content-center ">
                    <div className="standingsHeader border-bottom border-secondary row d-flex justify-content-center  mb-1 p-0 pb-1 ">
                      <div
                        className="col-2 d-flex align-items-center justify-content-center"
                        style={{ minHeight: "3vw" }}
                      >
                        Pos.
                      </div>
                      <div className="col-2 d-flex align-items-center justify-content-center"></div>
                      <div className="col-4 d-flex align-items-center justify-content-center">
                        N
                      </div>
                      <div className="col-2 d-flex align-items-center justify-content-center">
                        Pts.
                      </div>
                      <div className="col-2 d-flex align-items-center justify-content-center"></div>
                    </div>
                  </div>
                  <div>
                    <TableMobileView
                      unqiue={standings[0].rank}
                      teamPosition={standings[0]}
                    />
                  </div>
                  <div>
                    <TableMobileView
                      unqiue={standings[1].rank}
                      teamPosition={standings[1]}
                    />
                  </div>
                  {showCompleteStandings && (
                    <>
                      {standings.map((standing: any) => (
                        <div key={standing.rank}>
                          {standing.rank >= 3 ? (
                            <div>
                              <TableMobileView
                                unqiue={standing.rank}
                                teamPosition={standing}
                              />
                            </div>
                          ) : (
                            " "
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </>
            )}
          </MediaQuery>
          <div className="col-12 text-start mt-2 mb-2 ">
            <button
              type="button"
              className="btn btn-outline-ghost btn-sm btn_standings"
              style={{ color: "gray" }}
              onClick={(e) => toggleShowCompleteStandings(e)}
            >
              <span>Show complete standings...</span>
            </button>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "20vw" }}>
        <Footer />
      </div>
    </>
  );

  function toggleShowCompleteStandings(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (!showCompleteStandings) {
      e.currentTarget.innerText = "Close standings";
      setShowCompleteStandings(true);
    } else {
      e.currentTarget.innerText = "Show complete standings...";
      setShowCompleteStandings(false);
    }
  }

  function fetchCurrentSerieAStandings() {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "6e8aeca312msh1d7a43da6daef0ep1a3d9fjsnc0c38509a577",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    fetch(
      "https://api-football-v1.p.rapidapi.com/v3/standings?league=135&season=2024",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setAllSeasonData(response);
      })
      .catch((err) => console.error(err));
  }

  function fetchNextFixturesToCome() {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "6e8aeca312msh1d7a43da6daef0ep1a3d9fjsnc0c38509a577",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    fetch(
      "https://api-football-v1.p.rapidapi.com/v3/fixtures?league=135&team=492&next=50",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setNextFixtures(response);
        console.log(response);
      })
      .catch((err) => console.error(err));
  }
}

export default App;
