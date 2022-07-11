const printToFile = (data) => {
    const element = document.createElement('a');
    const textFile = new Blob([JSON.stringify(data)], {
      type: 'json/aplication',
    });
    element.href = URL.createObjectURL(textFile);
    element.download = 'data.json';
    document.body.appendChild(element);
    element.click();
}

export default printToFile;