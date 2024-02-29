import API_JSON from '../../configs/API_JSON';

const URL = 'pendaftaran';

export async function get() {
  return await API_JSON.get(`/api/${URL}`);
}

export async function getById(id_pendaftaran: string) {
  return await API_JSON.get(`/api/${URL}/${id_pendaftaran}`);
}

export async function reject(id_pendaftaran: string) {
  return await API_JSON.put(`/api/${URL}/reject/${id_pendaftaran}`);
}

export async function verify(id_pendaftaran: string) {
  return await API_JSON.put(`/api/${URL}/verify/${id_pendaftaran}`);
}

export async function remove(id_pendaftaran: string) {
  return await API_JSON.delete(`/api/${URL}/${id_pendaftaran}`);
}
