import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { object } from 'prop-types';

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

async function getData(url: string) {
  const response = await resolve(axios.get(url));
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
  // Default options are marked with *
  const response = await resolve(axios.post(url, data));
  return response;
}

async function putData(url: string, data = {}) {
  // Default options are marked with *
  const response = await resolve(axios.put(url, data));
  return response;
}

async function deleteData(url: string, data = {}) {
  // Default options are marked with *
  const response = await resolve(axios.delete(url, data));
  return response;
}

export { getData, putData, deleteData, postData, useData };
