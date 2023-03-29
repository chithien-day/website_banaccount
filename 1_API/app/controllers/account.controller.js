const db = require("../models");
const Account = db.accounts;

exports.create = (req, res) => {

  const account = new Account({
    id_gametype: req.body.id_gametype,
    description: req.body.description,
    game_picture: req.body.game_picture,
    gameusername: req.body.gameusername,
    gamepass: req.body.gamepass
  });

  account
    .save(account)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Lỗi khởi tạo account."
      });
    });
};

exports.findAll = (req, res) => {
    const id_gametype = req.query.id_gametype;
    var condition = id_gametype ? { id_gametype: { $regex: new RegExp(id_gametype), $options: "i" } } : {};
  
    Account.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Lỗi truy xuất dữ liệu Account"
        });
      });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Account.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Không tìm thấy Account với id:  " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Lỗi lấy dữ liệu Account với id=" + id });
      });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Không thể để trống dữ liệu"
        });
      }
    
      const id = req.params.id;
    
      Account.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Không thể cập nhật Account với id= ${id}. ID có thể không tồn tại`
            });
          } else res.send({ message: "Cập nhật thành công" });
        })
        .catch(err => {
          res.status(500).send({
            message: "Lỗi cập nhật Account với id=" + id
          });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Account.findByIdAndRemove(id)
      .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Không thể cập nhật Account với id= ${id}. ID có thể không tồn tại`
            });
          } else res.send({ message: "Xóa thành công" });
        })
        .catch(err => {
          res.status(500).send({
            message: "Lỗi xóa Account với id=" + id
          });
      });
};

exports.deleteAll = (req, res) => {
    Account.deleteMany({})
    .then(data => {
      res.send({
        message: `Đã xóa tất cả (${data.deletedCount} Account)!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Có lỗi xảy ra khi xóa toàn bộ Account"
      });
    });
};