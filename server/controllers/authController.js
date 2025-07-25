const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


// exports.register = async (req, res) => {
//     console.log('Register endpoint hit');
//   try {
//     console.log('Request body:', req.body);
//     const { name, email, password } = req.body;


//     // Validate input
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Check if user already exists
//     const existing = await User.findOne({ email: email.toLowerCase() });
//     if (existing) {
//       return res.status(409).json({ message: 'User already exists' });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Save user
//     const user = await User.create({
//       name:name,
//       email: email.toLowerCase(),
//       password: hashedPassword,
//     });

//     res.status(201).json({
//       message: 'User registered successfully',
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (err) {
//     console.error('Register Error:', err.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // exports.register = async (req, res) => {
// //   try {
// //     const { name, email, password } = req.body;

// //     const existing = await User.findOne({ email });
// //     if (existing) return res.status(400).json({ message: 'User already exists' });

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const user = await User.create({ name, email, password: hashedPassword });

// //     res.status(201).json({ message: 'User registered successfully' });
// //   } catch (err) {
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // };

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
