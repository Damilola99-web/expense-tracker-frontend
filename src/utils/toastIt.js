import { toast } from 'react-toastify';

export const toastit = (content, method) => {
	if (method === 'success') {
		toast.success(content);
	}
	if (method === 'info') {
		toast.info(content);
	}
	if (method === 'error') {
		toast.error(content);
	}
};
