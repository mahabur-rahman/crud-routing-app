const { response } = require("express");
const express = require("express");
let accounts = require("../db/db");
const router = express.Router();

// GET request

router.get("/accounts", (req, res) => {
  res.json({ userData: accounts });
});

// POST request
router.post("/accounts", (req, res) => {
  const incomingAccount = req.body;
  accounts.push(incomingAccount);
  res.json(accounts);
});

// single data :id
router.get("/accounts/:id", (req, res) => {
  const accountId = Number(req.params.id);

  const singleAccount = accounts.find((account) => account.id === accountId);

  if (!singleAccount) {
    res.status(500).send("Account not found");
  } else {
    res.status(200).json({ userData: [singleAccount] });
  }
});

// PUT request
router.put("/accounts/:id", (req, res) => {
  const accountId = Number(req.params.id);
  const body = req.body;
  const account = accounts.find((account) => account.id === accountId);
  const index = accounts.indexOf(account);

  if (!account) {
    res.status(500).send("Account not found");
  } else {
    const updatedAccount = { ...account, ...body };
    // console.log({ ...account, ...body });
    accounts[index] = updatedAccount;
    res.send(updatedAccount);
  }
});

// DELETE request
router.delete("/accounts/:id", (req, res) => {
  const id = Number(req.params.id);
  const deleteAccount = accounts.filter((account) => account.id !== id);

  if (!deleteAccount) {
    res.status(500).send("Account not found");
  } else {
    accounts = deleteAccount;
    // console.log(accounts);
    res.send(accounts);
  }
});

module.exports = router;
