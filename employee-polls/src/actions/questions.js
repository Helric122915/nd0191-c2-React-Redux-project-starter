import { _saveQuestion, _saveQuestionAnswer } from "../_DATA";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(authedUser, optionOneText, optionTwoText) {
  return (dispatch) => {
    dispatch(showLoading());

    return _saveQuestion({ optionOneText, optionTwoText, author: authedUser })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function answerQuestion({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    qid,
    authedUser,
    answer,
  };
}

export function handleAnswerQuestion(authedUser, qid, answer) {
  return (dispatch) => {
    return _saveQuestionAnswer({ authedUser, qid, answer }).then(() =>
      dispatch(answerQuestion({ authedUser, qid, answer }))
    );
  };
}
