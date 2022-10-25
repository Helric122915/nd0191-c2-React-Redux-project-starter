import { useState } from "react";
import { connect } from "react-redux";
import PollCard from "./PollCard";
import useAuth from "../hooks/useAuth";

const Dashboard = (props) => {
  const { authedUser } = useAuth();
  const [showUnansweredQuestions, setShowUnansweredQuestions] = useState(true);

  const { questions, users } = props;

  const toggleQuestions = () => {
    setShowUnansweredQuestions(!showUnansweredQuestions);
  };

  const answeredQids = Object.keys(questions)
    .filter((qid) => Object.keys(users[authedUser].answers).includes(qid))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  const unansweredQids = Object.keys(questions)
    .filter((qid) => !Object.keys(users[authedUser].answers).includes(qid))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  return (
    <div>
      <button onClick={toggleQuestions}>
        Show{" "}
        {showUnansweredQuestions
          ? "Answered Questions"
          : "Unanswered Questions"}
      </button>
      {showUnansweredQuestions && (
        <section>
          <h1>New Questions</h1>
          <ul>
            {unansweredQids.map((unansweredQid) => (
              <li key={unansweredQid}>
                <PollCard id={unansweredQid} />
              </li>
            ))}
          </ul>
        </section>
      )}
      {!showUnansweredQuestions && (
        <section>
          <h1>Answered Questions</h1>
          <ul>
            {answeredQids.map((answeredQid) => (
              <li key={answeredQid}>
                <PollCard id={answeredQid} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

const mapStateToProps = ({ questions, users }) => ({ questions, users });

export default connect(mapStateToProps)(Dashboard);
