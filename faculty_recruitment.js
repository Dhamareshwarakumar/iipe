let state = {
    "academic_experience": [
        {
            "organisation": "",
            "type_of_organisation": "",
            "designation": "",
            "from": "",
            "to": ""
        }
    ],
    "courses_taught": [
        {
            "course_code": "",
            "title": "",
            "level": "",
            "from": "",
            "to": ""
        }
    ],
    "update_list": []
}

// ==============************ ACADEMIC EXPERIENCE ************============= //

function getAcademicExperience() {
    fetch("./services/get_faculty_academic_experience.php")
        .then(response => response.json())
        .then(data => {
            if (data.status == "success") {
                if (data.data.length != 0) {
                    state.academic_experience = data.data;
                }
            } else {
                alert(data.msg);
            }
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => renderAcademicExperience());
}

function addAcademicExperience() {
    let academic_experience = state.academic_experience;
    academic_experience.push({
        "organisation": "",
        "type_of_organisation": "",
        "designation": "",
        "from": "",
        "to": ""
    });
    renderAcademicExperience();
}

function removeAcademicExperience(index) {
    let academic_experience = state.academic_experience;
    academic_experience.splice(index, 1);
    renderAcademicExperience();
}

function handleAcademicExperienceChange(element) {
    let academic_experience = state.academic_experience;
    let index = element.id.split("_")[0];
    let key = element.name;
    academic_experience[index][key] = element.value;
    console.log('Before Render');
    renderAcademicExperience();
    console.log('After Render');
}

function saveAcademicExperience() {
    if (!state.update_list.includes("academic_experience")) {
        alert("No changes made");
        return;
    }

    let error = false;

    // Validate Academic Experience
    state.academic_experience.forEach(item => {
        if (item.organisation == "") {
            alert("Organisation is required");
            error = true;
            return;
        }
        if (item.type_of_organisation == "") {
            alert("Type of Organisation is required");
            error = true;
            return;
        }
        if (item.designation == "") {
            alert("Designation is required");
            error = true;
            return;
        }
        if (item.from == "") {
            alert("From is required");
            error = true;
            return;
        }
        if (item.to == "") {
            alert("To is required");
            error = true;
            return;
        }
    });

    if (error) return;

    fetch("./services/post_faculty_academic_experience.php", {
        method: "POST",
        body: JSON.stringify(state.academic_experience),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status == "success") {
                alert("Academic Experience saved successfully");
                state.remove('academic_experience');
            } else {
                alert(data.msg);
            }
        })
        .catch(error => {
            console.error(error);
        });
}

function renderAcademicExperience() {
    let academic_experience = state.academic_experience;
    let html = "";
    academic_experience.forEach((item, index) => {
        console.log("Rendering... " + item.type_of_organisation);
        html += `
            <div class="row">
                <div class="col-md-2 my-2">
                    <div class="form-group">
                        <input type="text" class="form-control" id="${index}_organisation" name="organisation" placeholder="Organisation" value="${item.organisation}" onchange="handleAcademicExperienceChange(this)">
                    </div>
                </div>
                <div class="col-md-2 my-2">
                    <div class="form-group">
                        <select class="form-select" id="${index}_type_of_organisation" name="type_of_organisation" value="${item.type_of_organisation}" onchange="handleAcademicExperienceChange(this)">
                            <option value="" disabled>${item.type_of_organisation} Type of Organisation</option>
                            <option value="private">Private</option>
                            <option value="state">State Govt.</option>
                            <option value="central">Central Govt.</option>
                            <option value="CFTI/Autonomous/PSU">CFTI/Autonomous/PSU</option>
                            <option value="others">others</option>
                        </select>

                        <!-- <input type="text" class="form-control" id="${index}_type_of_organisation" name="type_of_organisation" placeholder="Type of Organisation" value="${item.type_of_organisation}" onchange="handleAcademicExperienceChange(this)"> -->
                    </div>
                </div>
                <div class="col-md-2 my-2">
                    <div class="form-group">
                        <input type="text" class="form-control" id="${index}_designation" name="designation" placeholder="Designation" value="${item.designation}" onchange="handleAcademicExperienceChange(this)">
                    </div>
                </div>
                <div class="col-md-2 my-2">
                    <div class="form-group">
                        <input type="date" class="form-control" id="${index}_from" name="from" placeholder="From" value="${item.from}"onchange="handleAcademicExperienceChange(this)">
                    </div>
                </div>
                <div class="col-md-2 my-2">
                    <div class="form-group">
                        <input type="date" class="form-control" id="${index}_to" name="to" placeholder="To" value="${item.to}" onchange="handleAcademicExperienceChange(this)">
                    </div>
                </div>
                <div class="col-md-1 my-2 d-grid">
                    <button class="btn btn-warning" onclick="editAcademicExperience(${index})">Edit</button>
                </div>
                <div class="col-md-1 my-2 d-grid">
                    <button class="btn btn-danger" onclick="removeAcademicExperience(${index})">Remove</button>
                </div>
            </div>
        `;
    });
    document.querySelector("#teaching-experience").querySelector("#list").innerHTML = html;
    if (!state.update_list.includes("academic_experience")) {
        state.update_list.push("academic_experience");
    }
}

getAcademicExperience();

// ==============************ ACADEMIC EXPERIENCE ************============= //
function getCoursesTaught() {
    fetch("./services/get_faculty_courses_taught.php")
        .then(response => response.json())
        .then(data => {
            if (data.status == "success") {
                if (data.data.length != 0) {
                    state.courses_taught = data.data;
                }
            } else {
                alert(data.msg);
            }
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => renderCoursesTaught());
}

function addCoursesTaught() {
    let courses_taught = state.courses_taught;
    courses_taught.push({
        "course_code": "",
        "title": "",
        "level": "",
        "from": "",
        "to": ""
    });
    renderCoursesTaught();
}

function removeAddCourseTaught(index) {
    let courses_taught = state.courses_taught;
    courses_taught.splice(index, 1);
    renderCoursesTaught();
}

function handleCoursesTaughtChange(element) {
    let courses_taught = state.courses_taught;
    let index = element.id.split("_")[0];
    let key = element.name;
    courses_taught[index][key] = element.value;
    renderCoursesTaught();
}

function saveCoursesTaught() {
    if (!state.update_list.includes("courses_taught")) {
        alert("No changes made");
        return;
    }

    let error = false;

    // Validate Courses Taught
    state.courses_taught.forEach(item => {
        if (item.course_code == "") {
            alert("Course Code is required");
            error = true;
            return;
        }

        if (item.title == "") {
            alert("Course Title is required");
            error = true;
            return;
        }

        if (item.level == "") {
            alert("Level is required");
            error = true;
            return;
        }

        if (item.from == "") {
            alert("From is required");
            error = true;
            return;
        }

        if (item.to == "") {
            alert("To is required");
            error = true;
            return;
        }
    });

    if (error) return;

    fetch("./services/post_faculty_courses_taught.php", {
        method: "POST",
        body: JSON.stringify(state.courses_taught),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status == "success") {
                alert("Courses Taught saved successfully");
                state.remove('courses_taught');
            } else {
                alert(data.msg);
            }
        })
        .catch(error => {
            console.error(error);
        });
}

function renderCoursesTaught() {
    let courses_taught = state.courses_taught;
    let html = "";
    courses_taught.forEach((item, index) => {
        html += `
            <div class="row">
                <div class="col-md-2 my-2">
                    <div class="form-group">
                        <input type="text" class="form-control" id="${index}_course_code" name="course_code" placeholder="Course Code" value="${item.course_code}" onchange="handleCoursesTaughtChange(this)">
                    </div>
                </div>
                <div class="col-md-2 my-2">
                    <div class="form-group">
                        <input type="text" class="form-control" id="${index}_title" name="title" placeholder="Course Title" value="${item.title}" onchange="handleCoursesTaughtChange(this)">
                    </div>
                </div>
                <div class="col-md-2 my-2">
                    <div class="form-group">
                        <input type="text" class="form-control" id="${index}_level" name="level" placeholder="Level (UG/PG/PhD)" value="${item.level}" onchange="handleCoursesTaughtChange(this)">
                    </div>
                </div>
                <div class="col-md-2 my-2">
                    <div class="form-group">
                        <input type="date" class="form-control" id="${index}_from" name="from" placeholder="From" value="${item.from}" onchange="handleCoursesTaughtChange(this)">
                    </div>
                </div>
                <div class="col-md-2 my-2">
                    <div class="form-group">
                        <input type="date" class="form-control" id="${index}_to" name="to" placeholder="To" value="${item.to}" onchange="handleCoursesTaughtChange(this)">
                    </div>
                </div>
                <div class="col-md-2 my-2 d-grid">
                    <button class="btn btn-danger" onclick="removeAddCourseTaught(${index})">Remove</button>
                </div>
            </div>
        `;
    });
    document.querySelector("#courses-taught").querySelector("#list").innerHTML = html;
    if (!state.update_list.includes("courses_taught")) {
        state.update_list.push("courses_taught");
    }
}

getCoursesTaught();