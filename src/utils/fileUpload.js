import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, './uploads/');
	},
	fileFilter(req, file, callback) {
		const ext = path.extname(file.originalname);
		if (
			ext !== '.png' &&
			ext !== '.jpg' &&
			ext !== '.gif' &&
			ext !== '.jpeg'
		) {
			return callback(new Error('Only images are allowed'));
		}
		callback(null, true);
	},
	limits: {
		fileSize: 1024 * 1024 * 5, // 5MB
	},
	filename(req, file, cb) {
		const filename = `${Date.now()}-${file.originalname}`;
		cb(null, filename);
	},
});
const upload = multer({ storage });
export default upload;
