const url = "http://universities.hipolabs.com/search?country=";
const btn = document.querySelector("button");
const inp = document.querySelector("input");
const list = document.querySelector("#list");

btn.addEventListener("click", async () => {
  list.innerHTML = "<li>Loading...</li>"; // Loading feedback

  const country = inp.value.trim();

  if (!country) {
    alert("Please enter a country.");
    list.innerHTML = ""; // Clear the loading message
    return;
  }

  try {
    const colleges = await getCollege(country);

    if (colleges.length === 0) {
      list.innerHTML = `<li>No colleges found in "${country}".</li>`;
    } else {
      showColleges(colleges);
    }
  } catch (error) {
    console.error("Error fetching colleges:", error);
    list.innerHTML = `<li>Something went wrong. Please try again later.</li>`;
  }
});

async function getCollege(country) {
  const response = await axios.get(`${url}${country}`);
  return response.data;
}

function showColleges(colleges) {
  list.innerHTML = ""; // Clear any previous list
  colleges.forEach((college) => {
    const li = document.createElement("li");
    li.innerText = college.name;
    list.appendChild(li);
  });
}
