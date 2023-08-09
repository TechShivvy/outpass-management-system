const express = require("express");
const {
  scanQR,
  registerEntry,
  entries,
} = require("../controllers/qrControllers");

const router = express.Router();

// router.route('/').post(registerUser);
// router.route('/login').post(authUser);
// router.route('/')
// .get(pendingOutpass)
// .post(insertOutpass);

router.route("/").get(scanQR);
router.route("/:id/").put(registerEntry);
router.route("/entries").get(entries);
// router.route("/:outpassId").post(registerEntry);
module.exports = router;
