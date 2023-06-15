const baseUrl = "https://expense-dev-server.temanedtech.com";
const token = localStorage.getItem("token");

window.onload = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.assign("/html/expense.html");
    }
    fetchData()
}

// Logout 

const logout = () => {
    localStorage.clear();
    window.location.reload();
};

const fetchData = async () => {
    const res = await fetch(baseUrl + "/expenses", {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    const data = await res.json();
    console.log(data);
    render(data);
}

const render = (data) => {
    const parentDiv = document.createElement("div");
    data.forEach(e => {
        const div = document.createElement("div");
        const keys = Object.keys(e);
        for (const key of keys) {
            const para = document.createElement("p");
            para.innerHTML = key + " : " + e[key];
            para.classList.add[key];
            div.appendChild(para);
        }
        const button1 = document.createElement("button");
        button1.innerText = "Delete Expense";
        button1.dataset.expId = e._id;
        button1.addEventListener("click", (event) => deleteExp(event));
        div.appendChild(button1);
        const update = document.createElement("button");
        update.innerText = "Update Expense";
        // button2.dataset.expId=e._id;
        update.setAttribute("type", "button");
        update.setAttribute("class", "btn btn-primary");
        update.setAttribute("data-toggle", "modal");
        update.setAttribute("data-target", "#updateExp");
        update.addEventListener("click", () => updateExp(e));
        div.appendChild(update);
        parentDiv.appendChild(div);
    })
    root.replaceChildren(parentDiv);
}


const updateExp = (e) => {
    console.log(e);
    const updateForm = document.getElementById("modal12");
    updateForm.name.value = e.name;
    updateForm.description.value = e.desc;
    updateForm.amount.value = e.amount;
    updateForm.transactionDetails.value = e.transactionDetails;
    updateForm.transactionAccount.value = e.transactionAccount;
    updateForm.type.value = e.type;
    updateForm.addEventListener("submit", (event) => {
        console.log(123);
        event.preventDefault();
        const formData = {
            name: updateForm.name.value,
            desc: updateForm.description.value,
            amount: updateForm.amount.value,
            transactionDetails: updateForm.transactionDetails.value,
            transactionAccount: updateForm.transactionAccount.value,
            type: updateForm.type.value
        }
        fetch(baseUrl + "/expenses/update/" + e._id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                window.location.reload();
            })
            .catch(err => console.log(err))
    })
}

const deleteExp = (event) => {
    fetch(baseUrl + "/expenses/delete/" + event.target.dataset.expId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            fetchData()
        })
}


const modal1 = document.getElementById("modal11");

modal1.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData1 = {
        name: modal1.name.value,
        desc: modal1.description.value,
        amount: modal1.amount.value,
        transactionDetails: modal1.transactionDetails.value,
        transactionAccount: modal1.transactionAccount.value,
        type: modal1.type.value
    }

    fetch(baseUrl + "/expenses/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(formData1)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            fetchData()
        })
})