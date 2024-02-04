import React, { useEffect, useMemo, useState } from "react";

// In this assignment, you will create a component that renders a large list of sentences and includes an input field for filtering these items. 
// The goal is to use useMemo to optimize the filtering process, ensuring the list is only re-calculated when necessary (e.g., when the filter criteria changes).
// You will learn something new here, specifically how you have to pass more than one value in the dependency array

const word =["a" , "b" , "c" ,"d" ,"e"];
const length = 100;
const words =[];
for(let i =0;i<length;i++){
    let sentences ="";
    for(let j =0;j<word.length;j++){
        sentences += (word[Math.floor(word.length * Math.random())])
        sentences +=" ";
    }
    words.push(sentences);
}

export function Assignment2() {
    const [sentences, setSentences] = useState(words);
    const [filter, setFilter] = useState("");

    const filteredSentences = useMemo(()=>{
      return  sentences.filter(x => x.includes(filter))
    } ,[filter , sentences]);

    return <div>
        <input type="text" onChange={(e) => {
            setFilter(e.target.value)
        }}></input>
        {filteredSentences.map(word => <div>
            {word}    
        </div>)}
    </div>
}