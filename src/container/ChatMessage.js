import React, { useContext } from "react";
import "../App.css";
import { doc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import firestore from "../firebase";
import SentimentSatisfiedTwoToneIcon from "@mui/icons-material/SentimentSatisfiedTwoTone";
import MicTwoToneIcon from "@mui/icons-material/MicTwoTone";
import { MyContext } from "../App";

const ChatMessage = () => {
  const { setLastSeen, setLastMessage, id } = useContext(MyContext);
  const [inputvalue, setInputValue] = useState("");
  const [fetchValue, setfetchVAlue] = useState([]);
  const [name, setName] = useState("");
  const [imgSrc, setImgSrc] = useState();
  const [check, setCheck] = useState(false);
  let time = "";

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  async function handleClick() {
    if (inputvalue) {
      const currentDate = await new Date();
      const a = currentDate.toString();
      const b = a.indexOf("GMT");
      const c = a.substring(0, b + 3);
      time = c;
      setLastSeen(c);
      setInputValue("");
      setLastMessage(inputvalue);
      setCheck(!check);
      setfetchVAlue([
        ...fetchValue,
        {
          name: "Abhay Kumar",
          class: "chatSender",
          message: inputvalue,
          time: time,
        },
      ]);
      console.log("use2");
      const setValueInFirestore = async () => {
        try {
          await setDoc(doc(firestore, "names", id), {
            message: [
              ...fetchValue,
              {
                name: "Abhay Kumar",
                class: "chatSender",
                message: inputvalue,
                time: time,
              },
            ],
            name: name,
            src: imgSrc,
          });
          console.log(imgSrc, "this is src");
          console.log("Value set in Firestore abhay");
        } catch (error) {
          console.error("Error setting value in Firestore:", error);
        }
      };

      setValueInFirestore();
    }
  }

  useEffect(() => {
    firestore
      .collection("names")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setName(data.name);
          setImgSrc(data.src);
          // Access the desired value
          const value = data.message;
          setfetchVAlue(value);
          if (value.length > 0) setLastSeen(value[value.length - 1].time);
          else setLastSeen("");
          setLastMessage(value[value.length - 1].message);
          console.log("time", value[value.length - 1].time);
          console.log(value, "hellohello");
        } else {
          console.log("Document not found");
        }
        console.log("this is 3");
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div className="chatLive">
      <div className="messageLive">
        <div className="chatReciever">
          <h1>reciever</h1>
          <div
            style={{ display: "flex", flexDirection: "row" }}
            className="messageWrapper"
          >
            <p className="p1">this is message</p>
            <p className="p2">23:43:23 GMT</p>
          </div>
        </div>
        {fetchValue.map((value) => (
          <div className={value.class}>
            <h1>{value.name}</h1>
            <div
              style={{ display: "flex", flexDirection: "row" }}
              className="messageWrapper"
            >
              <p className="p1">{value.message}</p>
              <p className="p2">{value.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="inputBottomdiv">
        <SentimentSatisfiedTwoToneIcon sx={{ margin: "10px" }} />
        <input
          value={inputvalue}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleClick();
          }}
        />
        {!inputvalue && <MicTwoToneIcon sx={{ margin: "10px" }} />}
        {inputvalue && <button onClick={handleClick}>send</button>}
      </div>
    </div>
  );
};
export default ChatMessage;
