exports.accomodate = async (req, res) => {
    const { name, phone, college, days, amount } = req.body;

    try {
        
        console.log(name, phone, college, days, amount);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
