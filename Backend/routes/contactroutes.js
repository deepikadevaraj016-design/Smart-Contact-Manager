const express =  require("express")
const router = express.Router()

const contactController = require('../controllers/contactcontroller');
const   authMiddleware = require("../middleware/authmiddleware")

router.post('/',authMiddleware, contactController.createContact);
router.get('/', authMiddleware, contactController.getContact);
router.put('/:id',authMiddleware, contactController.updateContact);
router.delete('/:id',authMiddleware, contactController.deleteContact);

module.exports=router