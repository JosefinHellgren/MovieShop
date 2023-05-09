import { useState } from "react";
import { getAuth,onAuthStateChanged} from 'firebase/auth';
import { useEffect } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import '../compontents/comments.css'
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp ,  faThumbsDown } from '@fortawesome/free-solid-svg-icons'
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

      

      if(commentText != ''){
        const timeStampText = timeStamp.toString();
        const formattedDate = new Intl.DateTimeFormat('en-US').format(timeStamp).toString();
        
        console.log("formatDate"+ formattedDate)
const movieId = movie.id.toString()

        db.collection("comments").doc(timeStampText).set({
         text: commentText,
         name : userName,
         time : formattedDate,
         movieid: movieId,
         timeStamp:timeStampText,
         thumbsUp : 0,
         thumbsDown : 0

        })
        .then(() => {
            console.log("saved.");
         
        })
        .catch((error) => {
            console.error("error saving: ", error);
        });
setCommentText('')}
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


      const thumbsUp = (id) => {
        if (user) {
          const userUID = auth.currentUser.uid;
          const userRatesRef = db
            .collection("users")
            .doc(userUID)
            .collection("rates")
            .doc(id);
      
          userRatesRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                console.log("User has already rated this comment.");
              } else {
                saveRateToFirebase(id, "thumbsup");
                console.log("thumbs up" + id);
                const commentRef = db.collection("comments").doc(id);
                commentRef
                  .get()
                  .then((doc) => {
                    if (doc.exists) {
                      const data = doc.data();
                      const updatedData = {
                        ...data,
                        thumbsUp: data.thumbsUp + 1,
                      };
                      commentRef
                        .set(updatedData)
                        .then(() => {
                          console.log("Thumbs up updated successfully");
                        })
                        .catch((error) => {
                          console.error("Error updating thumbs up:", error);
                        });
                    } else {
                      console.error("Comment not found");
                    }
                  })
                  .catch((error) => {
                    console.error("Error getting comment document:", error);
                  });
              }
            })
            .catch((error) => {
              console.error("Error checking user's rating:", error);
            });
        }
      };

   
   
const thumbsDown = (id) => {
  if (user) {
    const userUID = auth.currentUser.uid;
    const userRatesRef = db
      .collection("users")
      .doc(userUID)
      .collection("rates")
      .doc(id);

    userRatesRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("User has already rated this comment.");
        } else {
          saveRateToFirebase(id, "thumbsdown");
          console.log("thumbs down" + id);
          const commentRef = db.collection("comments").doc(id);
          commentRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                const data = doc.data();
                const updatedData = {
                  ...data,
                  thumbsDown: data.thumbsDown + 1,
                };
                commentRef
                  .set(updatedData)
                  .then(() => {
                    console.log("Thumbs down updated successfully");
                  })
                  .catch((error) => {
                    console.error("Error updating thumbs down:", error);
                  });
              } else {
                console.error("Comment not found");
              }
            })
            .catch((error) => {
              console.error("Error getting comment document:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error checking user's rating:", error);
      });
  }
};

      const saveRateToFirebase =(timeStamp,thumb)=>{

        if(user != null){
          const userUID = auth.currentUser.uid;

          db.collection("users").doc(userUID).collection("rates").doc(timeStamp).set({
            rate : thumb,
            id : timeStamp


          })
          .then(() => {
              console.log("saved.");
          })
          .catch((error) => {
              console.error("error saving: ", error);
          });

      } else {
           
      return

      }



      }
    

    return(
        <div className="comments-wrapper">
        
            
           {user && <div>
            <textarea className="comment-input"value={commentText} onChange={handleTextAreaChange} name="text" type="text" placeholder="your comment..."></textarea>
            <button onClick={saveToFirebase}>comment</button></div> }
            
            
<div className="comments-list">
            {comments && comments
            .slice()
          .sort((a,b)=> b.weightedScore - a.weightedScore)
          .map((comment) =>  (
  <div key={comment.timeStamp}>
<span>{comment.name}</span> {comment.time}  <FontAwesomeIcon onClick={()=>thumbsUp(comment.timeStamp)}  name={"thumbUp"} className="thumbUp" icon={faThumbsUp} />{comment.thumbsUp} 
        <FontAwesomeIcon onClick={()=>thumbsDown(comment.timeStamp)} className="thumbDown" name={"thumbDown"} icon={faThumbsDown} />{comment.thumbsDown} <br/> {comment.text} 
  </div>
))}
        </div>
        </div>
    )
}

export default Comments