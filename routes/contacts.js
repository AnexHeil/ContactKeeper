const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');
const { check, validationResult } = require('express-validator');

router.get('/', auth, async (req, res) => {
    try {
        const contacts = Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
});
router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty()
]],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, phone, type } = req.body;
        try {
            Contact.create({
                name,
                email,
                phone,
                type,
                user: req.user.id
            })
                .then(contact => {
                    res.json(contact);
                })
        }
        catch (error) {
            res.status(500).json('Server Error')
        }
    }
);
router.put('/:id', (req, res) => {

});
router.delete('/:id', (req, res) => {

});

module.exports = router;