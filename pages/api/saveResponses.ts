import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongodb';

const ResponseSchema = new mongoose.Schema({
  answers: [String],
});

const Response = mongoose.models.Response || mongoose.model('Response', ResponseSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await connectToDatabase();
      const { answers } = req.body;
      const newResponse = new Response({ answers });
      await newResponse.save();
      res.status(201).json({ message: 'Response saved successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error saving response' });
    }
  } else {
    // This will handle methods other than POST (like GET, PUT, etc.)
    res.status(405).json({ message: 'Method not allowed' });
  }
}
