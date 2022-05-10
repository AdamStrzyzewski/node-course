const mongoose = require("mongoose");
const bCrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Email required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
});

userSchema.methods.setPassword = async function (password) {
  this.password = await bCrypt.hash(password, bCrypt.genSaltSync(6));

  // jakislosowyciagznakow -> j2i39jf328eiji9cajsedf9asd0jfi9ads32$@RFew
  // j2i39jf328eiji9cajsedf9asd0jfi9ads32$@RFew -> jakislosowyciagznakow

  // SHA256 - bezpieczny -> 256 bit
  // MD5 - niebezpieczny -> 128 bit
  // Blowfish
  // długość -> kolizja
  // 12345 -> hifwqwe
  // 123457 -> hifwqwe
  // brute force

  /**
   * Hashing algorithm // dictionaries / rainbow
   * 12345 - fejwafi
   * 123456 - fdjiosfajds
   * alamakota - fasdijofsad
   * password - jfiaose23rop23
   *
   * ktoś kradnie bazę
   * ma listę hashy
   * hash z bazy i po kolei sprawdzamy wszystkie hashe z rainbow table
   *
   * 12345 - jfoewi1234
   * 123456 - jefwop4324
   * alamakota - fdspok5437
   * password - fdasok9324
   */
};

userSchema.methods.validatePassword = function (password) {
  return bCrypt.compare(password, this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
