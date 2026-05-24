const User = require('../mongo/schema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secretkey = process.env.SECRET_KEY

// -------------Register----------------
exports.register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // console.log(req.body);

        let userFound = await User.findOne({ email });

        if (userFound) {
            return res.status(400).send({
                msg: 'User already exists!'
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashPassword,
            addedContact: []
        });

        await newUser.save();

        res.status(201).send({
            msg: 'User registered successfully'
        });

    } catch (err) {

        console.log(err);

        res.status(500).send({
            msg: 'Registration failed!',
            err: error
        });

    }
}

// -------------LogIn----------------

exports.logIn = async (req, res) => {
    try {
        const { email, password } = req.body

        let userFound = await User.findOne({ email })
        if (userFound) {
            try {

                let passwordMatch = await bcrypt.compare(password, userFound.password)
                // console.log("passwordMatch:", passwordMatch, secretkey);

                if (!passwordMatch) {
                    return res.status(401).json({ error: 'Incorrect Password' });
                }

                const token = jwt.sign({ userId: userFound._id, email: userFound.email }, secretkey, {
                    expiresIn: '20d',
                });

                // console.log("token: ", token);
                // res.redirect('/home')
                return res.status(200).json({ msg: "loggin successfull", token });
            } catch (error) {
                return res.status(401).json({ error: 'Authentication faileddd' });
            }
        }
        else {
            return res.status(401).json({ msg: 'loggin failed or User not found' });
        }

    } catch (error) {
        console.log(error);

        res.status(400).send({
            msg: "Validation Error",
            error: error.message
        });
    }
}

// ------------- show profile / view contacts----------------

exports.gettingUserDeatils = async (req, res) => {
    try {
        const { userId, email } = req.data
        const userFound = await User.findOne({ email })
        if (userFound) {
            // console.log(userFound);
            res.send(userFound)
        }
        else {
            res.send({ msg: 'User not found in database' })
        }

    } catch (error) {
        console.log(error);

        res.status(400).send({
            msg: "Add Contact failed!",
            error: error.message
        });

    }
}

// ------------- Edit Profile ----------------
exports.profileEdit = async (req, res) => {
    try {
        const { userId, email } = req.data
        const userFound = await User.findOne({ email })
        if (userFound) {            
            const { name, phone, location } = req.body
            userFound.name = name
            userFound.number = phone
            userFound.location = location
            
            await userFound.save()

            res.send({ msg: 'Update successfully' })
        }
        else {
            res.send({ msg: 'You were not in data' })
        }

    } catch (error) {
        console.log(error);

        res.status(400).send({
            msg: "Update failed!",
            error: error.message
        });
    }
}


// ------------- Getting Contact----------------
exports.addingContact = async (req, res) => {
    try {
        const { userId, email } = req.data
        const userFound = await User.findOne({ email })
        if (userFound) {
            const { contactName, contactNumber, contactEmail } = req.body
            userFound.addedContact.push({ name: contactName, phone: contactNumber, email: contactEmail })
            // console.log(userFound)
            await userFound.save()

            res.send({ msg: 'New contact added successfully' })
        }
        else {
            res.send({ msg: 'You were not in data' })
        }

    } catch (error) {
        console.log(error);

        res.status(400).send({
            msg: "Add Contact failed!",
            error: error.message
        });

    }
}

// ------------- Show Favorite Contact ----------------

exports.getFavorite = async (req, res) => {

    try {
        const { email } = req.data;
        const { isFavorite, favoriteID } = req.body;
        const userFound = await User.findOne({ email });

        if (!userFound) {
            return res.send({
                msg: "User not found"
            });
        }

        userFound.addedContact.map((v) => {
            if (v._id == favoriteID) {
                v.favorite = isFavorite;
            }
        });

        await userFound.save();
        res.send({ msg: `Favorite updated`, favoriteID });

    } catch (error) {
        console.log(error);
        res.status(400).send({
            msg: "Favorite failed!",
            error: error.message
        });
    }
};

exports.showFavoriteContact = async (req, res) => {
    try {
        const { userId, email } = req.data
        const userFound = await User.findOne({ email })
        if (userFound) {
            const favoriteContacts = userFound.addedContact.filter((contact) => {

                return contact.favorite === true;

            });
            res.send(favoriteContacts)
        }
        else {
            res.send({ msg: 'You were not in data' })
        }

    } catch (error) {
        console.log(error);

        res.status(400).send({
            msg: "failed to show favorite contact!",
            error: error.message
        });

    }
}