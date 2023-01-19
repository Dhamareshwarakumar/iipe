

let state = {
    "academic_experience": [
        {
            "organization": "",
            "type_of_organization": "",
            "designation": "",
            "from": "",
            "to": ""
        }
    ]
}

function addAcademicExperience() {
    let academic_experience = state.academic_experience;
    academic_experience.push({
        "organization": "",
        "type_of_organization": "",
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
    console.log(state);
    academic_experience[index][key] = element.value;
    console.log(state);
}

function renderAcademicExperience() {
    let academic_experience = state.academic_experience;
    let html = "";
    academic_experience.forEach((item, index) => {
        html += `
            <div class="row my-3">
                <div class="col-md-2">
                    <div class="form-group">
                        <input type="text" class="form-control" id="${index}_organization" name="organization" placeholder="Organization" value="${item.organization}" onchange="handleAcademicExperienceChange(this)">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <input type="text" class="form-control" id="${index}_type_of_organization" name="type_of_organization" placeholder="Type of Organization" value="${item.type_of_organization}" onchange="handleAcademicExperienceChange(this)">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <input type="text" class="form-control" id="${index}_designation" name="designation" placeholder="Designation" value="${item.designation}" onchange="handleAcademicExperienceChange(this)">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <input type="date" class="form-control" id="${index}_from" name="from" placeholder="From" value="${item.from}" onchange="handleAcademicExperienceChange(this)">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <input type="date" class="form-control" id="${index}_to" name="to" placeholder="To" value="${item.to}" onchange="handleAcademicExperienceChange(this)">
                    </div>
                </div>
                <div class="col-md-2 d-grid">
                    <button class="btn btn-danger" onclick="removeAcademicExperience(${index})">Remove</button>
                </div>
            </div>
        `;
    });
    document.querySelector("#academic-experience").querySelector("#list").innerHTML = html;
}

renderAcademicExperience();
