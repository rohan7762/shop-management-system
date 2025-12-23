const Sale = require('../models/Sale');
const Product = require('../models/Product');

exports.createSale = async (req, res, next) => {
  try {
    const { productId, quantity, sellPrice } = req.body;

    const product = await Product.findOne({
      _id: productId,
      user: req.user._id,
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const costPrice = product.cost;
    const total = sellPrice * quantity;
    const profit = (sellPrice - costPrice) * quantity;

    product.stock -= quantity;
    await product.save();

    const sale = await Sale.create({
      product: product._id,
      quantity,
      sellPrice,
      costPrice,
      total,
      profit,
      user: req.user._id,
    });

    res.status(201).json(sale);
  } catch (err) {
    next(err);
  }
};

exports.getSales = async (req, res, next) => {
  try {
    const sales = await Sale.find({ user: req.user._id })
      .populate('product', 'name')
      .sort({ date: -1 });

    res.json(sales);
  } catch (err) {
    next(err);
  }
};

exports.getSummary = async (req, res, next) => {
  try {
    const sales = await Sale.find({ user: req.user._id });
    const expenses = await require('../models/Expense').find({
      user: req.user._id,
    });

    const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
    const totalProfit = sales.reduce((sum, s) => sum + s.profit, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

    res.json({
      revenue: totalRevenue,
      profit: totalProfit - totalExpenses,
      expenses: totalExpenses,
    });
  } catch (err) {
    next(err);
  }
};
