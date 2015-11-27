export default JSON.stringify({
  data: [1, 2, 3, 4, 5].map((id) => {
    return {
      "type": "opportunity",
      "id": `${id}`,
      "attributes": {
        "date-from": new Date(),
        "date-to": new Date(),
        "name": "Fox",
        "skills": ["JavaScript", "Node.js"]
      }
    };
  })
});
