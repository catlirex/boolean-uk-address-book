const viewSection = document.querySelector(".view-section");
const contactsSection = document.querySelector(".contacts-section");

const state = {
  contacts: [],
  selectedContact: null
};

/* [START] NO NEED TO EDIT */

function getContacts() {
  fetch("http://localhost:3000/contacts")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      state.contacts = data;

      renderContactsList();
    });
}

function renderContactsList() {
  const listEl = document.createElement("ul");
  listEl.className = "contacts-list";

  for (let i = 0; i < state.contacts.length; i++) {
    const contact = state.contacts[i];
    const listItemEl = renderContactListItem(contact);

    listEl.append(listItemEl);
  }

  contactsSection.append(listEl);
}

function renderAddressSection(address) {
  const containerEl = document.createElement("section");

  const headingEl = document.createElement("h2");
  headingEl.innerText = "Address";

  containerEl.append(headingEl);

  const streetText = document.createElement("p");
  streetText.innerText = address.street;

  containerEl.append(streetText);

  const cityText = document.createElement("p");
  cityText.innerText = address.city;

  containerEl.append(cityText);

  const postCodeText = document.createElement("p");
  postCodeText.innerText = address.postCode;

  containerEl.append(postCodeText);

  return containerEl;
}

function renderContactView() {
  const contact = state.selectedContact;

  if (!contact) return;

  viewSection.innerHTML = "";

  const containerEl = document.createElement("article");
  containerEl.className = "center light-shadow address-card";

  const headingEl = document.createElement("h1");

  const fullName = `${contact.firstName} ${contact.lastName}`;
  headingEl.innerText = fullName;

  containerEl.append(headingEl);

  const addressSectionEl = renderAddressSection(contact.address);

  containerEl.append(addressSectionEl);

  viewSection.append(containerEl);
}

/* [END] NO NEED TO EDIT */

function renderContactListItem(contact) {
  const listItemEl = document.createElement("li");

  const headingEl = document.createElement("h3");

  const fullName = `${contact.firstName} ${contact.lastName}`;

  headingEl.innerText = fullName;

  listItemEl.append(headingEl);

  const viewBtn = document.createElement("button");
  viewBtn.className = "button grey";
  viewBtn.innerText = "View";

  viewBtn.addEventListener("click", function () {
    state.selectedContact = contact;

    renderContactView();
  });

  listItemEl.append(viewBtn);

  const editBtn = document.createElement("button");
  editBtn.className = "button blue";
  editBtn.innerText = "Edit";

  editBtn.addEventListener("click", function () {
    // [TODO] Write Code
    renderEditForm(contact)
  });

  listItemEl.append(editBtn);

  return listItemEl;
}

function renderEditForm(contact){
  viewSection.innerHTML = ""

  let editContactForm = document.createElement("form")
  viewSection.append(editContactForm)
  editContactForm.setAttribute("class", "form-stack light-shadow center contact-form")
  
  let h1El = document.createElement("h1")
  h1El.innerText = "Edit Contact"

  let firstNameLabel = document.createElement("label")
  firstNameLabel.setAttribute("for","first-name-input")
  firstNameLabel.innerText = "First Name:"
  let firstNameInput = document.createElement("input")
  firstNameInput.setAttribute("id","first-name-input")
  firstNameInput.setAttribute("name","first-name-input")
  firstNameInput.setAttribute("type","text")
  firstNameInput.setAttribute("value", contact.firstName)

  let lastNameLabel = document.createElement("label")
  lastNameLabel.setAttribute("for","last-name-input")
  lastNameLabel.innerText = "Last Name:"
  let lastNameInput = document.createElement("input")
  lastNameInput.setAttribute("id","last-name-input")
  lastNameInput.setAttribute("name","last-name-input")
  lastNameInput.setAttribute("type","text")
  lastNameInput.setAttribute("value", contact.lastName)

  let streetLabel = document.createElement("label")
  streetLabel.setAttribute("for","street-input")
  streetLabel.innerText = "Street:"
  let streetInput = document.createElement("input")
  streetInput.setAttribute("id","street-input")
  streetInput.setAttribute("name","street-input")
  streetInput.setAttribute("type","text")
  streetInput.setAttribute("value", contact.address.street)

  let cityLabel = document.createElement("label")
  cityLabel.setAttribute("for","city-input")
  cityLabel.innerText = "City:"
  let cityInput = document.createElement("input")
  cityInput.setAttribute("id","city-input")
  cityInput.setAttribute("name","city-input")
  cityInput.setAttribute("type","text")
  cityInput.setAttribute("value", contact.address.city)

  let postCodeLabel = document.createElement("label")
  postCodeLabel.setAttribute("for","post-code-input")
  postCodeLabel.innerText = "Post Code:"
  let postCodeInput = document.createElement("input")
  postCodeInput.setAttribute("id","post-code-input")
  postCodeInput.setAttribute("name","post-code-input")
  postCodeInput.setAttribute("type","text")
  postCodeInput.setAttribute("value", contact.address.postCode)

  let checkboxDiv = document.createElement("div")
  checkboxDiv.setAttribute("class","checkbox-section")
  let blockLabel = document.createElement("label")
  blockLabel.setAttribute("for","block-checkbox")
  blockLabel.innerText = "Block:"
  let blockInput = document.createElement("input")
  blockInput.setAttribute("id","block-checkbox")
  blockInput.setAttribute("name","block-checkbox")
  blockInput.setAttribute("type","checkbox")
  blockInput.checked = contact.blockContact
  checkboxDiv.append(blockInput, blockLabel)
  
  let actionDiv = document.createElement("div")
  actionDiv.setAttribute("class", "actions-section")
  let submitBtn = document.createElement("button")
  submitBtn.setAttribute("class", "button blue")
  submitBtn.setAttribute("type", "submit")
  submitBtn.innerText = "Update"
  let delBtn  = document.createElement("button")
  delBtn.setAttribute("class", "button blue")
  delBtn.setAttribute("type", "button")
  delBtn.innerText = "Delete"
  actionDiv.append(delBtn, submitBtn)
  editContactForm.append(h1El, firstNameLabel, firstNameInput, lastNameLabel, lastNameInput, streetLabel, streetInput, cityLabel, cityInput, postCodeLabel, postCodeInput, checkboxDiv, actionDiv)

  editContactForm.addEventListener("submit", function(event){
    event.preventDefault()
    
    let updatedContact = {}
    let updatedAddress = {}
      if (contact.firstName !== firstNameInput.value) updatedContact.firstName = firstNameInput.value
      if (contact.lastName !== lastNameInput.value) updatedContact.lastName = lastNameInput.value
      if (contact.blockContact !== blockInput.checked) updatedContact.blockContact = blockInput.checked
      if (contact.address.street !== streetInput.value) updatedAddress.street = streetInput.value
      if (contact.address.city !== cityInput.value) updatedAddress.city = cityInput.value
      if (contact.address.postCode !== postCodeInput.value) updatedAddress.postCode = postCodeInput.value
      
     patchContactToServer(contact.id, updatedContact,contact.address.id, updatedAddress)
  })

  delBtn.addEventListener("click", function(){
    fetch(`http://localhost:3000/contacts/${contact.id}`,{
      method: 'DELETE',
    })
    .then(response => response.json())
    .catch((error) => {
      console.log(error)
      alert("There is something wrong.....")
    });  

    fetch(`http://localhost:3000/addresses/${contact.address.id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(function(){
      let contactList = document.querySelector(".contacts-list")
      contactList.remove()
      getContacts()
      viewSection.innerHTML = ""
    })
    .catch((error) => {
            console.log(error)
            alert("There is something wrong.....")
          });  
  })
}

function patchContactToServer(contactID, updatedContact, addressID, updatedAddress){
  if (updatedContact !== {}){
    return fetch(`http://localhost:3000/contacts/${contactID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedContact),
    })
    .then(response => response.json())
    .then(function(serverUpdatedContact){
      if (updatedAddress !== {}){
        fetch(`http://localhost:3000/addresses/${addressID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAddress),
      })
      .then(response => response.json())
      .then(function(json){
        let contactList = document.querySelector(".contacts-list")
        contactList.remove()
        getContacts()
        state.selectedContact = serverUpdatedContact
        state.selectedContact.address = json
        renderContactView()
      }) 
      .catch((error) => {
        console.log(error)
        alert("There is something wrong.....")
      });       
    }
  })      
  .catch((error) => {
    console.log(error)
    alert("There is something wrong.....")
  });  
  }
}

function listenNewContactButton() {
  const btn = document.querySelector(".new-contact-btn");

  btn.addEventListener("click", function () {
    // [TODO] Write Code
    renderCreateContactForm()
  });
}

function renderCreateContactForm(){
  viewSection.innerHTML = "";

  let creatContactForm = document.createElement("form")
  viewSection.append(creatContactForm)
  creatContactForm.setAttribute("class", "form-stack light-shadow center contact-form")
  
  let h1El = document.createElement("h1")
  h1El.innerText = "Create Contact"

  let firstNameLabel = document.createElement("label")
  firstNameLabel.setAttribute("for","first-name-input")
  firstNameLabel.innerText = "First Name:"
  let firstNameInput = document.createElement("input")
  firstNameInput.setAttribute("id","first-name-input")
  firstNameInput.setAttribute("name","first-name-input")
  firstNameInput.setAttribute("type","text")

  let lastNameLabel = document.createElement("label")
  lastNameLabel.setAttribute("for","last-name-input")
  lastNameLabel.innerText = "Last Name:"
  let lastNameInput = document.createElement("input")
  lastNameInput.setAttribute("id","last-name-input")
  lastNameInput.setAttribute("name","last-name-input")
  lastNameInput.setAttribute("type","text")

  let streetLabel = document.createElement("label")
  streetLabel.setAttribute("for","street-input")
  streetLabel.innerText = "Street:"
  let streetInput = document.createElement("input")
  streetInput.setAttribute("id","street-input")
  streetInput.setAttribute("name","street-input")
  streetInput.setAttribute("type","text")

  let cityLabel = document.createElement("label")
  cityLabel.setAttribute("for","city-input")
  cityLabel.innerText = "City:"
  let cityInput = document.createElement("input")
  cityInput.setAttribute("id","city-input")
  cityInput.setAttribute("name","city-input")
  cityInput.setAttribute("type","text")

  let postCodeLabel = document.createElement("label")
  postCodeLabel.setAttribute("for","post-code-input")
  postCodeLabel.innerText = "Post Code:"
  let postCodeInput = document.createElement("input")
  postCodeInput.setAttribute("id","post-code-input")
  postCodeInput.setAttribute("name","post-code-input")
  postCodeInput.setAttribute("type","text")

  let checkboxDiv = document.createElement("div")
  checkboxDiv.setAttribute("class","checkbox-section")
  let blockLabel = document.createElement("label")
  blockLabel.setAttribute("for","block-checkbox")
  blockLabel.innerText = "Block:"
  let blockInput = document.createElement("input")
  blockInput.setAttribute("id","block-checkbox")
  blockInput.setAttribute("name","block-checkbox")
  blockInput.setAttribute("type","checkbox")
  checkboxDiv.append(blockInput, blockLabel)

  let actionDiv = document.createElement("div")
  actionDiv.setAttribute("class", "actions-section")
  let submitBtn = document.createElement("button")
  submitBtn.setAttribute("class", "button blue")
  submitBtn.setAttribute("type", "submit")
  submitBtn.innerText = "Create"
  actionDiv.append(submitBtn)

  creatContactForm.append(h1El, firstNameLabel, firstNameInput, lastNameLabel, lastNameInput, streetLabel, streetInput, cityLabel, cityInput, postCodeLabel, postCodeInput, checkboxDiv, actionDiv)

  creatContactForm.addEventListener("submit", function(event){
    event.preventDefault()
    let newContact = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      blockContact: blockInput.checked,
    }

    let newAddress = {
      street: streetInput.value,
      city: cityInput.value,
      postCode: postCodeInput.value
    }
    
    postNewContact(newContact, newAddress)
})
}

function postNewContact(newContact, newAddress){
  return fetch("http://localhost:3000/addresses", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newAddress),
  })
  .then(response => response.json())
  .then(function(newAddressFromServer){
    newContact.addressId = newAddressFromServer.id

    fetch("http://localhost:3000/contacts", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    })
      .then(response => response.json())
      .then(function(json){
        let contactList = document.querySelector(".contacts-list")
        contactList.remove()
        getContacts()
        state.selectedContact = json
        state.selectedContact.address = newAddressFromServer
        
        renderContactView()
      })      
      .catch((error) => {
        console.log(error)
        alert("There is something wrong.....")
      });  
  })
  .catch((error) => {
    console.log(error)
    alert("There is something wrong.....")
  });  
}
// [TODO] Write Code

function main() {
  listenNewContactButton();
  getContacts();
}

main();
