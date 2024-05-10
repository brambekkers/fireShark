export const exportData = (data, name = 'data') => {
  console.log(data)
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${name}.json`; // Specify the filename here
  link.click();

  // Clean up the URL object
  URL.revokeObjectURL(url);

  // remove the link element
  link.remove();
}
