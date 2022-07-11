const buildRequest = (requestParams, url, type) => {
  if (type === 'body') {
    return{ requestParams, url};

  } else {
    Object.keys(requestParams).map((param) => {
      url = url.replace(`:${param}`, requestParams[param]);
    });
    return{ url};
  }
};

export default buildRequest;
