  const url = '/courses/search';

  const handleSubmit = (formElement) => {
    formElement.preventDefault();
    let data = {};

    [...formElement.currentTarget.elements]
        .filter((inputElement) => inputElement.type !== "submit")
        .forEach((inputElement) => {
            data[inputElement.getAttribute("name")] = inputElement.type === "file" ? inputElement.files : inputElement.value
        });

        fetch(url)
        .then(response => response.json())
        .then(repos => {
          console.log(repos);
        })
      .catch(err => console.log(err))

    return data
}

const searchCoursesForm = document.getElementById("searchCoursesForm")
 searchCoursesForm.addEventListener("submit", handleSubmit);