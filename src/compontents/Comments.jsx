import { useState } from "react";

const Comments = () => {
    //const userName?
    //const time and date.


    const timeStamp = new Date();


    const [comment, setComment] = useState({
        name: "",
        time: "",
        text: "",
      });




    return(
        <div>
            <div>
                <form>
            <textarea name="text" type="text" placeholder="your comment..."></textarea>
            <button>publish</button>
            </form>
            </div>


            and here you can read comments.
        </div>
    )
}

export default Comments