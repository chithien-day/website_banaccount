const db = require("../models");
const Game = db.games;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Không được để trống dữ liệu" });
    return;
  }

  const game = new Game({
    name: req.body.name
  });

  game
    .save(game)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Lỗi khởi tạo Game."
      });
    });
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  
    Game.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Lỗi truy xuất dữ liệu Game"
        });
      });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Game.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Không tìm thấy game với id:  " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Lỗi lấy dữ liệu game với id=" + id });
      });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Không thể để trống dữ liệu"
        });
      }
    
      const id = req.params.id;
    
      Game.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Không thể cập nhật game với id= ${id}. ID có thể không tồn tại`
            });
          } else res.send({ message: "Cập nhật thành công" });
        })
        .catch(err => {
          res.status(500).send({
            message: "Lỗi cập nhật game với id=" + id
          });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Game.findByIdAndRemove(id)
      .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Không thể cập nhật game với id= ${id}. ID có thể không tồn tại`
            });
          } else res.send({ message: "Xóa thành công" });
        })
        .catch(err => {
          res.status(500).send({
            message: "Lỗi xóa game với id=" + id
          });
      });
};

exports.deleteAll = (req, res) => {
    Game.deleteMany({})
    .then(data => {
      res.send({
        message: `Đã xóa tất cả (${data.deletedCount} game)!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Có lỗi xảy ra khi xóa toàn bộ game"
      });
    });
};

// exports.findAllPublished = (req, res) => {
  
// };