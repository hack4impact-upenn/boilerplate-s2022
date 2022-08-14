import { useState, useEffect } from 'react';
import axios from 'axios';

// So cookies can be sent automatically with requests
axios.defaults.withCredentials = true;

interface ResolvedReq {
  data: any | null;
  error: Error | unknown | null;
}

async function resolve(promise: Promise<any>) {
  const resolved: ResolvedReq = {
    data: null,
    error: null,
  };

  try {
    const res = await promise;
    resolved.data = res.data;
  } catch (e) {
    resolved.error = e;
  }

  return resolved;
}

const BACKENDURL = 'http://localhost:4000';

const URLPREFIX = `${BACKENDURL}/api`;

async function getData(url: string) {
  const response = await resolve(axios.get(`${URLPREFIX}/${url}`));
  return response;
}

const useData = (url: string) => {
  const [data, setData] = useState<ResolvedReq | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(url);
      setData(res);
    };

    fetchData();
    // getData(url).then((res) => setData(res.data));
  }, [url]);

  return data;
};

// https://stackoverflow.com/questions/53059059/react-hooks-making-an-ajax-request

async function postData(url: string, data = {}) {
  const response = await resolve(axios.post(`${URLPREFIX}/${url}`, data));
  return response;
}

async function putData(url: string, data = {}) {
  const response = await resolve(axios.put(`${URLPREFIX}/${url}`, data));
  return response;
}

async function deleteData(url: string, data = {}) {
  const response = await resolve(axios.delete(`${URLPREFIX}/${url}`, data));
  return response;
}

export { getData, putData, deleteData, postData, useData };
