//domain/.netlify/functions.hello
const items = [
  {
    id: 1,
    name: "Jion",
    email: "Ferri",
  },
  {
    id: 2,
    name: "Nika",
    email: "Merzhinska",
  },
];
exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};
