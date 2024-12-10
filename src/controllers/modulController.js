const Modul = require('../models/Modul');
const Matakuliah = require('../models/Matakuliah');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');

exports.createModul = async (req, res) => {
    try {
        const { title, pertemuanKe, matakuliahId } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'Silahkan upload modul' });
        }

        const matakuliah = await Matakuliah.findByPk(matakuliahId);
        if (!matakuliah) {
            fs.unlinkSync(file.path);
            return res.status(404).json({ message: 'Matakuliah tidak ditemukan' });
        }

        const modul = await Modul.create({
            title,
            fileUrl: file.path,
            pertemuanKe,
            matakuliahId
        });

        const modulWithRelations = await Modul.findByPk(modul.id, {
            include: [{
                model: Matakuliah,
                as: 'matakuliah'
            }]
        });

        res.status(201).json({
            message: 'Modul baru berhasil ditambahkan',
            data: modulWithRelations
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllModul = async (req, res) => {
    try {
        const moduls = await Modul.findAll({
            include: [{
                model: Matakuliah,
                as: 'matakuliah'
            }]
        });

        res.json({ data: moduls });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getModulById = async (req, res) => {
    try {
        const modul = await Modul.findByPk(req.params.id, {
            include: [{
                model: Matakuliah,
                as: 'matakuliah'
            }]
        });

        if (!modul) {
            return res.status(404).json({ message: 'Modul Tidak Ditemukan' });
        }

        res.json({ data: modul });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// exports.getModulByPertemuan = async (req, res) => {
//   try {
//     const { pertemuan } = req.params;
//     const modul = await Modul.findOne({
//       where: { pertemuanKe: pertemuan },
//       include: [{
//         model: Matakuliah,
//         as: 'matakuliah'
//       }]
//     });

//     if (!modul) {
//       return res.status(404).json({ message: "Tidak ada modul di prtemuan ini" });
//     }

//     return res.status(200).json({ message: "Berhasil mengambil data di modul", data: modul });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

exports.getModulByMatakuliah = async (req, res) => {
    try {
        const { matakuliah } = req.params;
        const modul = await Modul.findAll({
            where: { matakuliahId: matakuliah },
            include: [{
                model: Matakuliah,
                as: 'matakuliah'
            }]
        });

        if (!modul) {
            return res.status(404).json({ message: "Tidak ada modul di mtakuliah ini atau matakuliah tidak ditemukan" });
        }

        return res.status(200).json({ message: `Berhasil mengambil data di modul`, data: modul });

    } catch (error) {

    }
}
exports.updateModul = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, pertemuanKe, matakuliahId } = req.body;
        const modul = await Modul.findByPk(id);

        if (!modul) {
            return res.status(404).json({ message: 'Modul tidak ditemukan' });
        }

        if (matakuliahId) {
            const matakuliah = await Matakuliah.findByPk(matakuliahId);
            if (!matakuliah) {
                return res.status(404).json({ message: 'Matakuliah not found' });
            }
        }

        let fileUrl = modul.fileUrl;
        if (req.file) {
            // Delete old file
            if (fs.existsSync(modul.fileUrl)) {
                fs.unlinkSync(modul.fileUrl);
            }
            fileUrl = req.file.path;
        }

        await modul.update({
            title,
            fileUrl,
            pertemuanKe,
            matakuliahId
        });

        const updatedModul = await Modul.findByPk(modul.id, {
            include: [{
                model: Matakuliah,
                as: 'matakuliah'
            }]
        });

        res.json({
            message: 'Modul updated successfully',
            data: updatedModul
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteModul = async (req, res) => {
    try {
        const { id } = req.params;
        const modul = await Modul.findByPk(id);

        if (!modul) {
            return res.status(404).json({ message: 'Modul Tidak Ditemukan' });
        }

        // Delete file from storage
        if (fs.existsSync(modul.fileUrl)) {
            fs.unlinkSync(modul.fileUrl);
        }

        await modul.destroy();

        res.status(200).json({ status: 200, message: 'Modul berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.readModulFile = async (req, res) => {
    try {
        const { modulId } = req.params;
        const modul = await Modul.findByPk(modulId);

        // pengecekan apakah modul ada
        if (!modul) {
            return res.status(404).json({ message: 'Modul Tidak Ditemukan' });
        }

        // pengecekan apakah file ada
        const filePath = modul.fileUrl;
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'File Tidak Ditemukan' });
        }

        // Return URL file yang dapat diakses
        const fileUrl = `${process.env.BASE_URL}/${modul.fileUrl}`;  // Sesuaikan dengan path yang sesuai
        return res.status(200).json({ message: 'File berhasil diLoad', fileUrl });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.donwloadModulFile = async (req, res) => {
    try {
        const { modulId } = req.params;
        const modul = await Modul.findByPk(modulId);

        // pengecekan apakah modul ada
        if (!modul) {
            return res.status(404).json({ message: 'Modul Tidak Ditemukan' });
        }

        // url relative to base url
        const fileName = path.basename(modul.fileUrl);
        const fileUrl = `/uploads/${fileName}`;

        // Return URL file yang dapat diakses
        return res.status(200).json({ message: 'File berhasil diLoad', url: fileUrl });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.searchModul = async (req, res) => {
    try {
        const { keyword } = req.query;

        // Jika tidak ada keyword, kirim response kosong
        if (!keyword) {
            return res.status(400).json({ message: "Keyword tidak boleh kosong" });
        }

        const modulList = await Modul.findAll({
            where: {
                // Mencari keyword dalam `title`
                [Op.or]: [
                    { title: { [Op.like]: `%${keyword}%` } },
                ]
            },
            include: [
                {
                    model: Matakuliah,
                    as: 'matakuliah'
                }
            ]
        });

        if (modulList.length === 0) {
            return res.status(404).json({ message: "Tidak dapat menemukan modul" });
        }

        res.status(200).json({
            message: "Berhasil menemukan modul",
            data: modulList
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
