const { Router } = require("express");
const { response, request } = require("express");

const { check, validationResult } = require("express-validator");

const {
  clientsGet,
  clientsPost,
  deleteClients,
  updateClients,
} = require("../controllers/clients");

const { emailExisteix } = require("../helpers/db-validators");

const router = Router();

const validarCamps = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

router.get("/", (req = request, res = response) => {
  res.send("Accés denegat...");
});

router.get("/clients", clientsGet);
router.post(
  "/clients",
  [
    check("correu", "El correu no és vàlid").isEmail(),
    check("correu").custom(emailExisteix),
    check("nom", "El nom és obligatori").not().isEmpty(),
    check("tlf", "El telèfon ha de tenir 9 numeros").isLength({
      min: 9,
      max: 9,
    }),
    check("password", "El password ha de tenir més de 6 caràcters").isLength({
      min: 6,
    }),
    validarCamps,
  ],
  clientsPost
);
router.put("/clients/:correu", updateClients);
router.delete("/clients/:correu", deleteClients);

module.exports = router;
