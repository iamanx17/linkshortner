const urlmodel = require("../models/url.model.js");
const crypto = require("crypto");

//create data
exports.create = (req, res) => {
  if (req.body.urlid == null) {
    res
      .status(400)
      .send({ message: "Urlid must be exist while you send a post request!" });
  }
  const data = req.body.urlid;
  const urlid = Object.keys(data)[0];
  const url = Object.values(data)[0];

  if (urlid == null || url == null) {
    res.status(200).send({
      message: "You must post valid data!",
    });
  } else {
    let key = crypto.randomBytes(5).toString("hex");

    const urlmodelobj = new urlmodel({
      urlid: urlid,
      key: key,
      url: url,
    });
    urlmodelobj.save((err, data) => {
      if (err != null) {
        res.status(400).send({
          error: "Error occured to create data please try again",
        });
      } else {
        console.log("data saved successfully!!");
        res.status(200).send({
          status: true,
          data: {
            urlid: urlid,
            shorted_url: `https://localhost:3000/${key}/`,
            url: url,
          },
        });
      }
    });
  }
};

//retrieve all data
exports.findAll = (req, res) => {
  urlmodel.find((err, urlid) => {
    if (err != null) {
      res.status(500).json({
        message: "Some error occurred while retrieving locations.",
      });
    } else {
      res.send(urlid);
    }
  });
};

//retrieve single data
exports.findOne = (req, res) => {
  const urlid = req.params.urlid;
  urlmodel.find({ urlid: urlid }, (err, data) => {
    if (err != null) {
      res.status(500).send({
        message: `Could not retrieve urlid with id ${urlid}`,
      });
    } else {
      res.send(data);
    }
  });
};

//update data
exports.update = (req, res) => {
  const urlid = req.params.urlid;
  try {
    let data = urlmodel.findOneAndUpdate(
      { urlid: urlid },
      { url: req.body.url },
      { new: true }
    );
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: `Could not update note with id ${req.params.urlid}`,
    });
  }
};

//delete data
exports.delete =  (req, res) => {
  const urlid = req.params.urlid;
  try {
    let result =  urlmodel.findOneAndDelete({ urlid: urlid });
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: `Could not delete note with id ${req.params.urlid}`,
    });
  }
};
