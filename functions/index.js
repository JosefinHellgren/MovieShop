const functions = require("firebase-functions");




exports.calculateWeightedScore = functions.firestore
    .document("comments/{commentId}")
    .onUpdate((change, context) => {
      const comment = change.after.data();
      const thumbsUp = comment.thumbsUp || 0;
      const thumbsDown = comment.thumbsDown || 0;
      const weightedScore = thumbsUp / thumbsDown * thumbsUp;
      return change.after.ref.update({weightedScore});
    });
