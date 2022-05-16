import { notes } from '../../data.js';

const appNotes = async (req, res) => {
  try {
    if (req.method === 'GET') {
      res.status(200).json(notes);
    } else if (req.method === 'POST') {
      const { userNote } = await req.body;
      const newUserNote = {
        id: Date.now(),
        userNote,
      };
      notes.push(newUserNote);
      res.status(201).json(newUserNote);
    }
  } catch (error) {
    console.log(error);
  }
};

export default appNotes;
