
import Question from "./components/Question"
import './App.css'
import { useEffect, useState ,useRef } from "react"

import logo from "./assets/beee.png"



function App() {
  const [categories,setCategories] = useState([])
  
  const [questions,setQuestions] = useState([]);
  const categoryEl = useRef();
  const amountEl = useRef();
  const difficultyEl = useRef();


  const shuffleArray = (arr,ele)=>{
    let res = new Array(arr.length + 1).fill(0);
    let answerPos = Math.floor(Math.random()*(res.length-1));
    res[answerPos] = ele;
    let j = 0
    for (let i=0;i<res.length;i++){
        if (res[i] == 0 ){
            res[i] = arr[j];
            j += 1;

        }
    }

    return res

}
const decodeString = (str)=>{
  const textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  return textarea.value

}

  const handleSubmit = (e)=>{
    e.preventDefault();
    fetch("https://opentdb.com/api.php?"+ new URLSearchParams({amount:amountEl.current.value,category:categoryEl.current.value,difficulty:difficultyEl.current.value}))
    .then((data)=>data.json())
    .then((ques)=>{
      
      setQuestions(ques.results.map((obj,i)=>{
        return {
          id: i + Date.now(),
          ques:decodeString(obj.question),
          ans:decodeString(obj.correct_answer),
          options:shuffleArray(obj.incorrect_answers,obj.correct_answer).map(decodeString),
        }
      }));
    })
    
  }
  
    useEffect(()=>{
      fetch("https://opentdb.com/api_category.php").then((data)=>data.json()).then((json)=>{setCategories(json.trivia_categories)});
      },[])
    
    
 

  return (
    <div className='container'>
      
      <form className="header" action="" onSubmit={handleSubmit} >
        <div className="logo">
            <h2>QuizzyBEE</h2>
            <img src={logo} alt=""  />

            </div>
        <div className="form-group">
          <label htmlFor="category">Choose Category</label>
          <select name="" id="category" ref={categoryEl}>
            {categories.map((cate)=>{return <option value={cate.id} >{cate.name}</option>})}
          </select>
        </div>
        <div className="form-group">
        <label htmlFor="amount">No.of Questions</label>
        <input type="number" min="1" id='amount' step="1" ref={amountEl} />

        </div>
        <div className="form-group">
        <label htmlFor="difficulty">Choose Difficultly level</label>
          <select name="" id="difficulty" ref={difficultyEl}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button type="submit">Generate</button>

      </form>
      
      {questions.map((obj)=>{
        return <Question quiz={obj} key={obj.id}/>

      })}
      



    </div>
  )
}



export default App
