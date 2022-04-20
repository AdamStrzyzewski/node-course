// promises ułatwia uniknięcie callback hell
const fs = require("fs").promises;

// odczytać zawartość folderu
// podać informacje o plikach i sub katalogach
// fs.readdir => promise
fs.readdir(__dirname)
  .then((files) => {
    return Promise.all(
      files.map(async (filename) => {
        const stats = await fs.stat(filename);
        return {
          name: filename,
          size: stats.size,
          date: stats.mtime,
          isFolder: stats.isDirectory(),
        };
      })
    );
  })
  .then((result) => {
    console.table(result);
  });

// alternatywny zapis
const readDirectory = async () => {
  const files = await fs.readdir(__dirname);
  const filesStats = await Promise.all(
    files.map(async (filename) => {
      const stats = await fs.stat(filename);
      return {
        name: filename,
        size: stats.size,
        date: stats.mtime,
        isFolder: stats.isDirectory(),
      };
    })
  );
  console.log(filesStats);
};

readDirectory();
