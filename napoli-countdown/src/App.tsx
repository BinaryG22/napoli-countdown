import { useEffect, useState } from "react";
import TablePositionView from "./assets/components/tablePositionView/TablePositionView";
import Footer from "./assets/components/footer/Footer";
import * as allSeasonTest from "./test/allSeasonData.json";
import * as fixtureData from "./test/fixtureData.json";
import "./index.css";

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
    //fetchCurrentSerieAStandings();

    //fetchNextFixturesToCome();

    /**
     * for test purposes
     */

    setAllSeasonData(allSeasonTest);
    setNextFixtures(fixtureData);
  }, []);

  useEffect(() => {
    if (allSeasonData !== undefined) {
      setStandings(allSeasonData.response[0].league.standings[0]);
    }
  }, [allSeasonData]);

  useEffect(() => {
    if (standings !== undefined) {
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
            <div className="row">
              {statKeeper && (
                <>
                  <div className="col-4 d-flex align-items-center justify-content-center">
                    <a
                      className="logo_link"
                      href="https://www.google.com/search?q=SSC+napoli+standings&rlz=1C1CSMH_deAT1028AT1028&ei=v83vY5j2POyUxc8P4IGDgAI&ved=0ahUKEwjY0fvpnZ39AhVsSvEDHeDAACAQ4dUDCA8&uact=5&oq=SSC+napoli+standings&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIFCAAQgAQyCQgAEBYQHhDxBDIGCAAQFhAeMgUIABCGAzoFCAAQkQI6BAgAEEM6CwguEIAEEMcBENEDOgUILhCABDoLCC4QgAQQxwEQrwFKBAhBGABQAFipH2DRIGgAcAF4AIAB7gGIAdASkgEGNy4xMS4ymAEAoAEBwAEB&sclient=gws-wiz-serp#sie=t;/m/048xg8;2;/m/03zv9;st;fp;1;;;"
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
                        <strong>Wins Left</strong>
                      </div>
                      <div className="col-6  d-flex align-items-center justify-content-end">
                        <strong>{statKeeper.numberOfWins}</strong>
                      </div>
                    </div>
                    <div
                      className="row mb-2 d-flex justify-content-center align-items-center  pb-2"
                      style={{ minHeight: "6vw" }}
                    >
                      <div className="col-6  d-flex align-items-center">
                        <strong>Draws Left</strong>
                      </div>
                      <div className="col-6  d-flex align-items-center justify-content-end">
                        <strong>{statKeeper.numberOfDraws}</strong>
                      </div>
                    </div>
                    {nextFixtures && (
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
                              <div className="mt-2 mt-0 row d-flex align-items-center justify-content-end">
                                <div className="col-3 pe-0 d-flex align-items-center justify-content-center">
                                  <img
                                    className="dg_home:logo"
                                    src={
                                      nextFixtures.response[
                                        statKeeper.numberOfWins +
                                          statKeeper.numberOfDraws -
                                          1
                                      ].teams.home.logo
                                    }
                                  />
                                </div>
                                <div className="col-3 d-flex align-items-center justify-content-center">
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

                                <div className="col-3 d-flex align-items-center justify-content-center">
                                  <strong>
                                    {new String(
                                      nextFixtures.response[
                                        statKeeper.numberOfWins +
                                          statKeeper.numberOfDraws -
                                          1
                                      ].teams.away.name
                                    ).slice(0, 3)}
                                  </strong>
                                </div>
                                <div className="col-3 ps-0  d-flex align-items-center justify-content-center">
                                  <img
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
                </>
              )}
            </div>
          )}

          {
            // display here the first and second place
          }
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
          <div className="col-6 text-start mt-2 mb-2 ">
            <button
              type="button"
              className="btn btn-outline-ghost btn-sm"
              onClick={(e) => toggleShowCompleteStandings(e)}
            >
              <span style={{ fontSize: "2vw" }}>
                {" "}
                Show complete standings...
              </span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
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
      "https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=135",
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
      })
      .catch((err) => console.error(err));
  }
}

export default App;
