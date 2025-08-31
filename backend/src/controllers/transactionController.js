import Transaction from "../models/Transaction.js";

export const addTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({ ...req.body, user: req.user._id });
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  const { page = 1, limit = 10, startDate, endDate } = req.query;
  const query = { user: req.user._id };

  if (startDate && endDate) {
    query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  const transactions = await Transaction.find(query)
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const count = await Transaction.countDocuments(query);

  res.json({ transactions, totalPages: Math.ceil(count / limit), currentPage: Number(page) });
};

export const getSummary = async (req, res) => {
  const { startDate, endDate } = req.query;
  const match = { user: req.user._id };
  if (startDate && endDate) {
    match.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  const summary = await Transaction.aggregate([
    { $match: match },
    { $group: { _id: "$category", total: { $sum: "$amount" } } },
  ]);

  res.json(summary);
};
