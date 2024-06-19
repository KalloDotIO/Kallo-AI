export default function generateGUID() {
  return 'xxxxxxxx'.replace(/[x]/g, function() {
    return Math.floor(Math.random() * 16).toString(16);
  });
}

