const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5555; // Use process.env.PORT for environment variable PORT or fallback to 5555
const usermodel = require('./model/usermodel');

app.use(cors());
app.use(express.json());

// MONGODB CONNECTING
mongoose.connect('mongodb+srv://muhammadsulaimant367:sRoEDatvJY9hXWiz@cluster0.g9par5e.mongodb.net/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('mongodb connected with express');
}).catch((err) => {
  console.log('mongodb connection err:', err.message);
});

// SHOW DATA OR GETTING WITHOUT ID
app.get('/getserver', async (req, res) => {
  try {
    const users = await usermodel.find();
    res.send(users);
  } catch (err) {
    console.log('getserver error:', err.message);
    res.status(500).send({ error: 'Server error' });
  }
});

// SHOW DATA OR GETTING USING ID
app.get('/getserver/:id', async (req, res) => {
  try {
    const user = await usermodel.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (err) {
    console.log('getserver/:id error:', err.message);
    res.status(500).send({ error: 'Server error' });
  }
});

// POSTING OR PUSHING VALUES
app.post('/postserver', async (req, res) => {
  const { name, place, email, password, id } = req.body;
  const user = new usermodel({ name, place, email, password, id });
  try {
    await user.save();
    res.send({ message: 'User created successfully', user });
  } catch (err) {
    console.log('postserver error:', err.message);
    res.status(500).send({ error: 'Server error' });
  }
});

// UPDATING
app.put('/updateserver/:id', async (req, res) => {
  try {
    const user = await usermodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    console.log('updateserver/:id error:', error.message);
    res.status(500).send({ error: 'Server error' });
  }
});

// DELETE
app.delete('/deleteserver/:id', async (req, res) => {
  try {
    const user = await usermodel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send('User successfully deleted');
  } catch (error) {
    console.log('deleteserver/:id error:', error.message);
    res.status(500).send({ error: 'Server error' });
  }
});

// PORT RUNNING
app.listen(port, () => {
  console.log('Server is running on port', port);
});
