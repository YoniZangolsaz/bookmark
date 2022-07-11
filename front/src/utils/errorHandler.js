const errorHandler = (error) => {
  if (error >= 500) {
    return [{
      message: 'השירות אינו זמין, שמחנו לעזור',
      status_code: error
    }];
  }
  if (error >= 400) {
    return [];
  }
};

export default errorHandler;
