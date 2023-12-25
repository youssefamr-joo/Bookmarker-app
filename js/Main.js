var bookmarkNameInput = document.getElementById("bookmarkNameInput");
var bookmarkUrlInput = document.getElementById("bookmarkUrlInput");
var searchInput = document.getElementById("searchInput");
var bookmarkList=[];
var addButton = document.querySelector(".submitBtn");
var updateButton = document.querySelector(".ubdateBtn");
var closeButton = document.getElementById("closeButton");
var showLayer= document.querySelector(".layer");
var tableBody =document.getElementById("tableBody");
var localStoragebookmark="bookmarks";
var webSiteIndex=0;


//link button to add
addButton.addEventListener("click",addSite)
//close layer form button
closeButton.addEventListener("click",function(){
    showLayer.classList.add("d-none")
})
//close  layer form layer 
showLayer.addEventListener("click", clsoeFromlayer)


if(localStorage.getItem(localStoragebookmark) !=null ){
    bookmarkList =JSON.parse(localStorage.getItem(localStoragebookmark)) 
    displayData();
}


function addSite(){
    if(validationName() && validationUrl() == true ){
        var bookmark={
            name:bookmarkNameInput.value,
            url:bookmarkUrlInput.value
            }
            bookmarkList.push(bookmark)
            localStorage.setItem(localStoragebookmark, JSON.stringify(bookmarkList))
            clearForm()
            displayData()
            removeIsValidton()
            removeIsUnValidton()
    }else{
        showLayer.classList.remove("d-none")
    }
    
}
function clearForm(){
    bookmarkNameInput.value ="";
    bookmarkUrlInput.value ="";
}
function displayData(){
    var cartona="";
    for(var i = 0 ; i<bookmarkList.length ; i++){
        cartona +=`
        <tr>
        <td>${i+1}</td>
        <td>${bookmarkList[i].name}</td>
        <td><a href="${bookmarkList[i].url}" target="_blank"><button class="btn bg-primary"><i class="fa-solid fa-eye"></i> Visit</button></a></td>
        <td><button onclick="deleteItem(${i})" class="btn bg-danger"><i class="fa-solid fa-trash"></i> Delete</button></td>
        <td><button onclick="getUbdateData(${i})" class="btn bg-warning"><i class="fa-solid fa-pen-to-square"></i> Update</button></td>
        </tr>
        `
    }
    document.getElementById("tableBody").innerHTML=cartona
}
function deleteItem(index){
    bookmarkList.splice(index,1)
    localStorage.setItem(localStoragebookmark, JSON.stringify(bookmarkList))
    displayData()
}
function searchData(){
    var term =searchInput.value;
    var cartona="";
    for(var i = 0 ; i<bookmarkList.length ; i++){
        if ( bookmarkList[i].name.toLowerCase().includes(term.toLowerCase()) == true ){
        cartona +=`
        <tr>
        <td>${i+1}</td>
        <td>${bookmarkList[i].name}</td>
        <td><a href="${bookmarkList[i].url}" target="_blank"><button class="btn bg-primary"><i class="fa-solid fa-eye"></i> Visit</button></a></td>
        <td><button onclick="deleteItem(${i})" class="btn bg-danger"><i class="fa-solid fa-trash"></i> Delete</button></td>
        <td><button onclick="getUbdateData(${i})" class="btn bg-warning"><i class="fa-solid fa-pen-to-square"></i> Update</button></td>
        </tr>
        `
    }
    }
    document.getElementById("tableBody").innerHTML=cartona
}
function getUbdateData(x){
    webSiteIndex=x;
    bookmarkNameInput.value = bookmarkList[x].name;
    bookmarkUrlInput.value = bookmarkList[x].url;
    window.scrollTo(0,0);
    addButton.classList.add("d-none");
    updateButton.classList.replace("d-none","d-inline-block");
}
updateButton.addEventListener("click",ubdateDate)
function ubdateDate(){
    addButton.classList.remove("d-none");
    updateButton.classList.replace("d-inline-block","d-none");
    bookmarkList[webSiteIndex].name = bookmarkNameInput.value;
    bookmarkList[webSiteIndex].url = bookmarkUrlInput.value;
    localStorage.setItem(localStoragebookmark, JSON.stringify(bookmarkList))
    clearForm()
    displayData()
}
// validate to name ^[A-Za-z0-9]{2,10}$
// validate yo url (https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})
function validationName(){
    var text =bookmarkNameInput.value;
    var regexName=/^[A-Za-z0-9]{2,15}$/;
    if( regexName.test(text) ){
        bookmarkNameInput.classList.replace("is-invalid","is-valid")
        return true
    }else{
        bookmarkNameInput.classList.add("is-invalid")
        return false 
    }  

}
function validationUrl(){
    var urlText =bookmarkUrlInput.value;
    var regexUrl=/^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})$/;
    if( regexUrl.test(urlText) ){
        bookmarkUrlInput.classList.replace("is-invalid","is-valid")
        return true
    }else{
        bookmarkUrlInput.classList.add("is-invalid")
        return false 
    }  

}
function clsoeFromlayer(){
    showLayer.classList.add("d-none")
}