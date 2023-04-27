import { useState,useEffect,useRef } from "react"



const Question = ({quiz})=>{
    const [flipped,setFlipped] = useState(false);
    const [height, setHeight] = useState('initial')
    const frontEl = useRef();
    const backEl = useRef();

    const setMaxHeight=()=>{
        const frontHeight = frontEl.current.getBoundingClientRect().height;
        const backHeight = backEl.current.getBoundingClientRect().height;
        setHeight(Math.max(frontHeight,backHeight,100));
    }

    

    


    useEffect(setMaxHeight,[quiz.ques,quiz.ans,quiz.options])

    useEffect(()=>{
        window.addEventListener("resize",setMaxHeight);
        return ()=> window.removeEventListener("resize",setMaxHeight);
    },[])

    return (
        <div className={`card ${flipped ? "flip" : ""}`} style={{height:height}} onClick={()=>{setFlipped(!flipped)}}>
            <div className="front" ref={frontEl}>
            <h1 className="question">{quiz?.ques}</h1>
            <div className="options">
            {quiz?.options.map((ans)=>{
                return <h4 className="option">{ans}</h4>
            })
            }

            </div>

            </div>

            <div className="back" ref={backEl}>{quiz?.ans}</div>

        </div>
    )
}

export default Question