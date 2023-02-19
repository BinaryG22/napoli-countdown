import { useEffect, useState } from "react";
import TablePositionView from "./assets/components/tablePositionView/TablePositionView";
import "./App.css";
import Footer from "./assets/components/tablePositionView/footer/Footer";

interface statKeeper {
  gamesInTotal: number;
  napoli_playedGames: number;
  napoli_gamesLeft: number;
  diffPoints: number;
  maxPointsForSec: number;
  pointsToReachTotal: number;
  pointsToReachLeft: number;
  numberOfWins: number;
  numberOfDraws: number;
}

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
        napoli_playedGames: standings[0].all.played,
        napoli_gamesLeft: standings.length * 2 - 2 - standings[0].all.played,
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
    <div>
      {allSeasonData && (
        <div className="header">
          <div className="title">
            <h1>
              ROAD TO SCUDETTO {allSeasonData.response[0].league.season}/
              {parseInt(allSeasonData.response[0].league.season as string) + 1}
            </h1>
          </div>
        </div>
      )}
      <div className="parentContainer">
      {standings && (
        <div className="logoContainer">
          {statKeeper && (
            <>
              <a
                className="logo_link"
                href="https://www.google.com/search?q=SSC+napoli+standings&rlz=1C1CSMH_deAT1028AT1028&ei=v83vY5j2POyUxc8P4IGDgAI&ved=0ahUKEwjY0fvpnZ39AhVsSvEDHeDAACAQ4dUDCA8&uact=5&oq=SSC+napoli+standings&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIFCAAQgAQyCQgAEBYQHhDxBDIGCAAQFhAeMgUIABCGAzoFCAAQkQI6BAgAEEM6CwguEIAEEMcBENEDOgUILhCABDoLCC4QgAQQxwEQrwFKBAhBGABQAFipH2DRIGgAcAF4AIAB7gGIAdASkgEGNy4xMS4ymAEAoAEBwAEB&sclient=gws-wiz-serp#sie=t;/m/048xg8;2;/m/03zv9;st;fp;1;;;"
              >
                <img className="logo" src={standings[0].team.logo}></img>
              </a>

              <div className="outerStatContainer">
                <div className="statContainer">
                  <h3>Games Yet To Play</h3>
                  <h1>{statKeeper.napoli_gamesLeft}</h1>
                </div>
                <div className="statContainer">
                  <h3>Wins Left</h3>
                  <h1>{statKeeper.numberOfWins}</h1>
                </div>
                <div className="statContainer">
                  <h3>Draws Left</h3>
                  <h1>{statKeeper.numberOfDraws}</h1>
                </div>
                {nextFixtures && (
                  <div className="statContainer">
                    <h3>Decisive Game</h3>
                    <div className="dg_fixtureContainer">
                      <div className="dg_date">
                        <h1>
                          {new Date(
                            nextFixtures.response[
                              statKeeper.numberOfWins +
                                statKeeper.numberOfDraws -
                                1
                            ].fixture.date
                          ).toLocaleDateString()}
                        </h1>
                      </div>
                      <div className="dg_fixture">
                        <div className="dg_home">
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
                          <h1>
                            {new String(
                              nextFixtures.response[
                                statKeeper.numberOfWins +
                                  statKeeper.numberOfDraws -
                                  1
                              ].teams.home.name
                            ).slice(0, 3)}
                          </h1>
                        </div>
                        <div className="dg_away">
                          <h1>
                            {new String(
                              nextFixtures.response[
                                statKeeper.numberOfWins +
                                  statKeeper.numberOfDraws -
                                  1
                              ].teams.away.name
                            ).slice(0, 3)}
                          </h1>
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
          <div className="container">
            <div className="innerContainer">
              <div className="headerContainer">
                <div className="headerElement">Pos.</div>
                <div className="headerElement"></div>
                <div className="headerElement_name">N</div>
                <div className="headerElement">P</div>
                <div className="headerElement">W</div>
                <div className="headerElement">D</div>
                <div className="headerElement">L</div>
                <div className="headerElement">G+</div>
                <div className="headerElement">G-</div>
                <div className="headerElement">G+/-</div>
                <div className="headerElement">Pts.</div>
              </div>
              
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TablePositionView teamPosition={standings[0]} />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TablePositionView teamPosition={standings[1]} />
              </div>
              {showCompleteStandings && (
                <>
                  {standings.map((standing: any) => (
                    <div key={standing.rank}>
                      {standing.rank >= 3 ? (
                         <div
                         style={{
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                         }}
                       >
                         <TablePositionView teamPosition={standing} />
                       </div>
                      ) : (
                        " "
                      )}
                    </div>
                  ))}
                </>
              )}
             <button
        className="showStandings_btn"
        onClick={(e) => toggleShowCompleteStandings(e)}
      >
        Show complete standings...
      </button>
            </div>
          </div>
        </>
      )}

      </div>
      <Footer />
    </div>
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
