function fetchCatFacts() {
  axios
    .get("https://datausa.io/api/data?drilldowns=Nation&measures=Population")
    .then(data => console.log(data.data))
    .catch(() => console.log("CANCEL"));
}
