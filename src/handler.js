const { nanoid } = require('nanoid');
const notes = require('./notes');

// Menambahkan Catatan
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan!',
  });
  response.code(500);
  return response;
};

// Menampilkan Catatan yang telah ditambahkan
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

// Membuka Catatan yang ditambahkan berdasarkan Id
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan, id tidak ditemukan!',
  });

  response.code(404);
  return response;
};

// Mengubah Catatan sesuai dengan id
const editNoteByIdHandler = (request, h) => {
  // Mendapatkan nilai id
  const { id } = request.params;

  // Dapatkan notes terbaru yang dikirim client melalui request
  const { title, tags, body } = request.payload;

  // memperbaharui nilai updatedAt
  const updatedAt = new Date().toISOString();

  // Mendapatkan index array pada objek catatan sesuai id yang ditentukan
  const index = notes.findIndex((note) => note.id === id);

  // Cek apakah gagal atau tidak
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbaharui!',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal diperbaharui!',
  });
  response.code(404);
  return response;
};

// Menghapus catatan sesuai dengan id
const deleteNoteByIdHandler = (request, h) => {
  // Mendapatkan nilai id dari parameter url
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  // Lakukan pengecekan, pastikan nilainya tidak sama dengan -1
  if (index !== -1) {
    // Menghapus catatan dari index-nya
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus!',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'success',
    message: 'Gagal menghapus catatan, id tidak ditemukan!',
  });
  response.code(200);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
