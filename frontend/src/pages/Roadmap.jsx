

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { getRoadmaps, completeTopic } from "../api/roadmapApi";
import "../styles/roadmap.css";

function Roadmap() {
  const { user } = useAuth();
  const [roadmaps, setRoadmaps] = useState([]);
  const [expandedRoadmap, setExpandedRoadmap] = useState(null);

  useEffect(() => {
    if (user?.userId) {
      loadRoadmaps();
    }
  }, [user]);

  const loadRoadmaps = async () => {
    try {
      const data = await getRoadmaps(user.userId);
      setRoadmaps(data.roadmaps || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleComplete = async (roadmapId, week, title) => {
    try {
      await completeTopic({
        roadmapId,
        weekNumber: week,
        topicTitle: title,
      });
      loadRoadmaps();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleRoadmap = (roadmapId) => {
    if (expandedRoadmap === roadmapId) {
      setExpandedRoadmap(null);
    } else {
      setExpandedRoadmap(roadmapId);
    }
  };

  return (
    <>
      <Navbar />

      <div className="roadmap-container">
        <h1>My Roadmaps</h1>

        {roadmaps.length === 0 ? (
          <p>No roadmaps found</p>
        ) : (
          roadmaps.map((roadmap) => {
            // Safely fall back to an empty array if roadmapContent is missing
            const content = roadmap.roadmapContent || [];
            
            // Limit to 1 week if not expanded
            const visibleContent = expandedRoadmap === roadmap._id 
              ? content 
              : content.slice(0, 1);

            return (
              <div className="roadmap-card-vertical" key={roadmap._id}>
                {/* 1. Title */}
                <h2 className="roadmap-title-large">{roadmap.title}</h2>

                {/* 2. Vertical Progress Bar */}
                <div className="progress-section-vertical">
                  <div className="progress-labels">
                    <span>Progress</span>
                    <span className="progress-text">{roadmap.progress}%</span>
                  </div>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${roadmap.progress}%` }}
                    />
                  </div>
                </div>

                {/* 3. Toggle Action Button */}
                <div className="roadmap-actions-vertical">
                  <button
                    className="view-roadmap-btn-full"
                    onClick={() => toggleRoadmap(roadmap._id)}
                  >
                    {expandedRoadmap === roadmap._id
                      ? "Hide Full Roadmap"
                      : "View Full Roadmap"}
                  </button>
                </div>

                {/* 4. Weekly Topics Content */}
                <div className="weeks-container-vertical">
                  {visibleContent.map((week) => (
                    <div key={week.week} className="week-block">
                      <h3>Week {week.week}</h3>

                      <ul className="topics-list">
                        {(week.topics || []).map((topic, index) => (
                          <li key={index} className="topic-item">
                            <input
                              type="checkbox"
                              checked={topic.completed || false}
                              onChange={() =>
                                handleComplete(roadmap._id, week.week, topic.title)
                              }
                            />
                            <span className={topic.completed ? "completed" : ""}>
                              {topic.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default Roadmap;
