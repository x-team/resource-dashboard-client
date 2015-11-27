export default JSON.stringify({
  data: [1, 2, 3, 4, 5].map((id) => {
    return {
      "type": "developer",
      "id": `${id}`,
      "attributes": {
        "name": "Kamil Ogórek",
        "first-name": "Kamil",
        "last-name": "Ogórek",
        "created-at": new Date(),
        "updated-at": new Date(),
        "profile-url": "https://github.com/kamilogorek/",
        "image-url": "https://avatars2.githubusercontent.com/u/1523305?v=3&s=460",
        "skills": ["JavaScript", "Node.js"],
        "location": "Kraków, PL",
        "timezone": "Europe/Warsaw",
        "rate": 128,
        "next-available": new Date()
      }
    };
  })
});
