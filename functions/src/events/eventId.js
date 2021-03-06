const admin = require("firebase-admin");
const serviceAccount = require("../../wildhabitatexercise-firebase-adminsdk-z62ei-63967fed83.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const firestore = admin.firestore();
const eventsRef = firestore.collection("events");

exports.getSingleEvent = (req, res) => {
  if (!firestore) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    firestore = admin.firestore();
  }
  const { eventId } = req.params;
  eventsRef
    .doc(eventId)
    .get()
    .then((doc) => {
      let event = doc.data();
      event.id = doc.id;
      res.status(200).json({
        status: "success",
        data: event,
        message: "Events loaded successfully",
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        data: err,
        message: "Error getting events",
        statusCode: 500,
      });
    });
};

exports.deleteEvent = (req, res) => {
  if (!firestore) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    firestore = admin.firestore();
  }
  eventsRef
    .doc(req.params.eventId)
    .delete()
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Events DELETED",
        statusCode: 200,
      });
      return
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        data: err,
        message: "Error deleting events",
        statusCode: 500,
      });
    });
};

exports.updateEvent = (req, res) => {
  if (!firestore) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    firestore = admin.firestore();
  }
  eventsRef
    .doc(req.params.eventId)
    .update(req.body)
    .then(() => {
      res.status(200).json({
        status: "item updated",
        message: "Events updated",
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        data: err,
        message: "Error updating event",
        statusCode: 500,
      });
    });
};
