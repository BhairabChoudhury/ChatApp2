const  express = require("express") ; 
const  {registerUser  ,authUser , allUsers} = require("../controllers/userControllers") ; 

const {protect} = require("../middleware/authMiddleware") ;

const router = express.Router() ;
router.get("/find" ,protect , allUsers) ;  // project act as middleware 

router.post("/",registerUser) ; 
router.post("/login" , authUser) ;

module.exports = router; 