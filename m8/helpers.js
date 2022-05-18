// const { exec } = require("child_process");
const fs = require("fs").promises;
const Jimp = require("jimp");

const isAccesible = (path) => {
  return fs
    .access(path) //  sprawdzamy dostęp
    .then(() => true)
    .catch(() => false);
};

const createFolderIfNotExist = async (folder) => {
  if (!(await isAccesible(folder))) {
    await fs.mkdir(folder);
  }
};

const isImage = (path) => {
  // wolniejsze, ale bez dependancies
  return new Promise((resolve) => {
    Jimp.read(path, (err, image) => {
      if (err) resolve(false);
      try {
        image.resize(256, 256).write(path); // save
      } catch (err) {
        console.log(err);
        resolve(false);
      }
      resolve(true);
    });
  });
  // szybsze ale z koniecznością ustawienia środowiska // imagemagick
  //   return new Promise((resolve) => {
  //     exec(`magick ${path} -rotate 0 ${path}`, (err, stdout, stderr) => {
  //       if (err) {
  //         resolve(false);
  //       }
  //       resolve(true);
  //     });
  //   });
};

module.exports = { createFolderIfNotExist, isImage };
