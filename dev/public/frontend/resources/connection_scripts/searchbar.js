  const url = '/courses/search';

  const handleSubmit = (formElement) => {
    formElement.preventDefault();
    let data = {};

    [...formElement.currentTarget.elements]
        .filter((inputElement) => inputElement.type !== "submit")
        .forEach((inputElement) => {
            data[inputElement.getAttribute("name")] = inputElement.type === "file" ? inputElement.files : inputElement.value
        });

        fetch("http://localhost:4001/course")
        .then(response => response.json())
        .then(repos => {
          console.log(repos);

          const list = document.getElementById("list");
          document.documentElement.innerHTML = "<pre>" +
         document.documentElement.innerHTML.replace(/</g,"&lt;") +
            "</pre>";

         list.innerHTML += `<li><a href="  ">Item ${list.children.length + 1}</a></li>`;

         for 

        }
        )

    return data
}

const searchCoursesForm = document.getElementById("searchCoursesForm")
 searchCoursesForm.addEventListener("submit", handleSubmit);