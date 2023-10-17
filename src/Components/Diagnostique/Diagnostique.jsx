import React, { useState, useEffect } from 'react';
import Titre from '../Titre/Titre';
import UserContext from '../../UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function Diagnostique() {
  const { userData } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchQuestions();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/categories/getallCategories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories: ', error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:8080/question/getallquestion');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions: ', error);
    }
  };

  const choix = ["tout à fait d'accord","d'accord", "neutre", "pas d'accord", "Absolument pas d'accord"];

  const handleChoiceSelection = (questionId, choice) => {
    const updatedChoices = selectedChoices.filter(choice => choice.question.id_qst !== questionId);
    updatedChoices.push({
     
      user: userData,
      question: questions.find(question => question.id_qst === questionId),
      response: choice
    });
    setSelectedChoices(updatedChoices);
  };

 
const handleSubmit = async () => {
    const response = await fetch('http://localhost:8080/reponse/setallReponse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedChoices)
    });
  
    if (!response.ok) {
      console.error('Failed to submit responses');
      return;
    }
  
    console.log('Responses submitted successfully');
history('/diagnoFinal')  
};
  

  return (
    <div className="container mt-4">
      <div className="jumbotron">
        <h2 className="display-5">Bienvenue dans le diagnostique</h2>
        {categories.map((category) => (
          <div key={category.id_cat}>
            <Titre titre={category.name} />
            {questions
              .filter((question) => question.categories && question.categories.id_cat === category.id_cat)
              .map((question) => (
                <div key={question.id_qst}>
                  <>
                    {question.contenue_qst}
                    {choix.map((option, index) => (
                      <div className="form-check" key={index}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`question_${question.id_qst}`}
                          onChange={() => handleChoiceSelection(question.id_qst, option)}
                        />
                        <label className="form-check-label">{option}</label>
                      </div>
                    ))}
                  </>
                </div>
              ))}
          </div>
        ))}
        <button
          type="button"
          className="btn btn-primary"
          style={{ backgroundColor: 'rgb(127, 136, 255)' }}
          onClick={handleSubmit}
        >
          Soumettre Vos Réponses
        </button>
      </div>
    </div>
  );
}

export default Diagnostique;
