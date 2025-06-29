
const userModel = require('../model/UserModel.js')

const getUserData = async (req,res) =>{
    try {

        const userId = req.user?.id;

         const user = await userModel.findOne({ _id: userId });
          if (!user) {
            return res.json({ success: false, message: 'User Not Found' });
        }
        
        res.json({
            success : true,
            userData : {
                name : user.name,
                isAccountVerified : user.isAccountVerified
            }
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

module.exports = getUserData