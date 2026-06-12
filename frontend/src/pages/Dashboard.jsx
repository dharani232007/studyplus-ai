import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import { getDashboard, getRoadmaps }
from "../api/roadmapApi";

import Navbar from "../components/Navbar";

import "../styles/dashboard.css";

export default function Dashboard() {

  const { user } = useAuth();

  const [stats, setStats] =
    useState(null);

  const [roadmaps, setRoadmaps] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard =
  async () => {

    try {

      const dashboardData =
      await getDashboard(
        user.userId
      );

      const roadmapData =
      await getRoadmaps(
        user.userId
      );

      setStats(
        dashboardData
      );

      setRoadmaps(
        roadmapData.roadmaps || []
      );

    } catch(error){

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  if(loading){

    return <h2>Loading...</h2>;

  }

  return (

    <div>

      <Navbar />

      <div className="dashboard">

        {/* WELCOME */}

        <div className="welcome-card">

          <h1>
            Welcome,
            {user?.name}
            👋
          </h1>

          <p>
            Continue your learning journey
          </p>

        </div>

        {/* STATS */}

        <div className="stats-grid">

          <div className="stat-card">

            <h3>
              Total Roadmaps
            </h3>

            <h1>
              {
                stats?.totalRoadmaps || 0
              }
            </h1>

          </div>

          <div className="stat-card">

            <h3>
              Completed
            </h3>

            <h1>
              {
                stats?.completedRoadmaps || 0
              }
            </h1>

          </div>

          <div className="stat-card">

            <h3>
              Progress
            </h3>

            <h1>
              {
                stats?.overallProgress || 0
              }%
            </h1>

          </div>

        </div>

        {/* RECENT ROADMAPS */}

        <div className="roadmaps-section">

          <h2>
            Your Roadmaps
          </h2>

          {

            roadmaps.length === 0

            ?

            <p>
              No roadmap found
            </p>

            :

            roadmaps.map((roadmap)=>(

              <div
                className="roadmap-card"
                key={roadmap._id}
              >

                <div>

                  <h3>
                    {roadmap.title}
                  </h3>

                  <p>
                    Progress:
                    {roadmap.progress}%
                  </p>

                </div>

                <div>

                  {

                    roadmap.completed

                    ?

                    <span
                      className="completed"
                    >
                      Completed
                    </span>

                    :

                    <span
                      className="active"
                    >
                      Active
                    </span>

                  }

                </div>

              </div>

            ))

          }

        </div>

      </div>

    </div>

  );
}