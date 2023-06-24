let accounts = require("../../accounts");
const Account = require("../../models/Account");

exports.accountCreate = async (req, res) => {
  try {
    const newAccount = await Account.create(req.body);
    return res.status(201).json(newAccount);
  } catch (err) {
    return res.status(500).json({ message: "something wrong" });
  }
};

exports.accountDelete = async (req, res) => {
  try {
    const { accountId } = req.params;
    const foundAccount = await Account.findOneAndDelete({ _id: accountId });
    if (foundAccount) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "something wrong" });
  }
};

exports.accountUpdate = async (req, res) => {
  try {
    const { accountId } = req.params;
    const foundAccount = await Account.findByIdAndUpdate(
      { _id: accountId },
      req.body,
      { new: true }
    );
    if (foundAccount) {
      res.status(201).json(foundAccount);
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "something wrong" });
  }
};

exports.accountsGet = async (req, res) => {
  try {
    const accounts = await Account.find();
    return res.status(201).json(accounts);
  } catch (err) {
    return res.status(500).json({ message: "something wrong" });
  }
};

exports.getAccountByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const { currency } = req.query;
    const foundAccount = await Account.findOne({ username: username });
    if (currency?.toLowerCase() === "usd") {
      const dollar = foundAccount.funds * 3.31;

      const accountInUsd = {
        ...foundAccount,
        funds: dollar,
      };
      return res.status(201).json(accountInUsd);
    }
    return res.status(201).json(foundAccount);
  } catch (err) {
    return res.status(500).json({ message: "something wrong", err });
  }
};
