import API_JSON from '../../configs/API_JSON';

const URL = 'pembayaran';

export async function get() {
  return await API_JSON.get(`/api/${URL}`);
}

export async function getById(id_pembayaran: string) {
  return await API_JSON.get(`/api/${URL}/${id_pembayaran}`);
}

export async function reject(id_pembayaran: string) {
  return await API_JSON.put(`/api/${URL}/reject/${id_pembayaran}`);
}

export async function verify(id_pembayaran: string) {
  return await API_JSON.put(`/api/${URL}/verify/${id_pembayaran}`);
}
