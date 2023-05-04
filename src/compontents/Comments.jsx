import { useState } from "react";
import { getAuth,onAuthStateChanged} from 'firebase/auth';
import { useEffect } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import '../compontents/comments.css'
import { useSelector } from "react-redux";

const Comments = () => {
    const [commentText, setCommentText] = useState('');
    const [userName,setUserName] = useState('');
    const timeStamp = new Date();
   
    const auth = getAuth();
    const db = firebase.firestore();
    const [comments,setComments] = useState([]);
    const [user, setUser] = useState('');
  
    const selectedMovie = useSelector(state => state.selectedMovie.selectedMovie);
    const movie = selectedMovie;
   
    console.log("comments: " + selectedMovie.title);
   

useEffect(() => {
  const commentsRef = db.collection("comments");
  const filteredCommentsRef = commentsRef.where("movieid", "==", movie.id.toString());
  filteredCommentsRef.onSnapshot((querySnapshot) => {
    if (!querySnapshot.empty) {
      const commentsData = querySnapshot.docs.map((doc) => doc.data());
      console.log("Comments for movie", movie.id, ":", commentsData);
      setComments(commentsData);
    } else {
      console.log("No comments found for movie", movie.id);
    }
  }, (error) => {
    console.log("Error getting comments:", error);
  });
}, []);


    const saveToFirebase = () =>{
        const timeStampText = timeStamp.toString();
        const formattedDate = new Intl.DateTimeFormat('en-US').format(timeStamp).toString();
        
        console.log("formatDate"+ formattedDate)
const movieId = movie.id.toString()

        db.collection("comments").doc(timeStampText).set({
         text: commentText,
         name : userName,
         time : formattedDate,
         movieid: movieId,
         timeStamp:timeStampText
        })
        .then(() => {
            console.log("saved.");
         
        })
        .catch((error) => {
            console.error("error saving: ", error);
        });
setCommentText('')
    }
   
    useEffect(() => {
        const unsubscribe =
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log(uid)
          setUser(user);
         
          
            const userRef = db.collection("users").doc(uid);
    
            userRef.get().then((doc) => {
            if (doc.exists) {
            const userData = doc.data();
            const username = userData.username;
            console.log("Username:", username);
            setUserName(username)
            } else {
            console.log("cant fint username");
        }
                }).catch((error) => {
            console.log("Error getting document:", error);
            });
    } else {
          console.log('user is signed out')
        }
      });
      return () => {
        unsubscribe();
    };
}, []);

      const handleTextAreaChange = (event) =>{
        const {value} = event.target;
        setCommentText(value)
      }

    




//if your nog logged in you cant see the input field.
    return(
        <div className="comments-wrapper">
            
           {user && <div>
            <textarea className="comment-input"value={commentText} onChange={handleTextAreaChange} name="text" type="text" placeholder="your comment..."></textarea>
            <button onClick={saveToFirebase}>comment</button></div> }
            
            
<div className="comments-list">
            {comments && comments.slice()
          .reverse()
          .map((comment) =>  (
  <div key={comment.timeStamp}>
<span>{comment.name}</span> {comment.time}: <br/> {comment.text} 
  </div>
))}
        </div>
        </div>
    )
}

export default Comments