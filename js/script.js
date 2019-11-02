/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Declaring const value as it will be used throughout all the functions and the value will always be same
const studentList = document.querySelectorAll('.student-item');
const page = 10;

// creating showPage function to display the student list
const showPage = (students,section)=>{

   const listLength = students.length;
   let oldStudents = studentList;

   // setting the starting and ending value in order to display fix amount of student list
   const startIndex = (page * section) - page;
   let endIndex = startIndex + page;

   // assigning the value of listlength to end index so that the end index value doesnt exceed list length
   if(endIndex > listLength){
      endIndex = listLength;
   }

   // hiding all the list
  for(let i = 0; i < oldStudents.length; i++){
      oldStudents[i].style.display = 'none';
  }

  //displaying the list that is called
  for(let i = startIndex; i < endIndex; i++){
      students[i].style.display = 'block';
  }
};

// creating this function in order to create the navigation and attach it in the HTML
const appendPageLinks = (students) => {

   // assigning student list length to list length
   const listLength = students.length;
   // creating navigation elements and attaching it to HTML
   const htmlPage = document.querySelector('.page');
   const paginationDiv = document.createElement('div');   
   paginationDiv.className = 'pagination';
   htmlPage.appendChild(paginationDiv);
   const paginationUL = document.createElement('ul');
   paginationDiv.appendChild(paginationUL);

   // generating the navigation number to display in the navigation buttons and creating arrays to store the li and a
   const navigationNum = Math.floor(listLength / page) + 1;

   // generating buttons depending upon the size of list
   for( let i = 0; i < navigationNum; i++){      
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.setAttribute('href', '#');
      a.innerHTML = i + 1;
      paginationUL.appendChild(li);
      li.appendChild(a);
      
      // assigning active class to the first link
      if(i === 0){
         a.className = 'active';
      }
   }

   //checking if the last and secondlast is same and if same remove it
   // This is to remove the double pagination
   const previousPagination = document.querySelector('.pagination');
   const secondLastChild = htmlPage.lastChild.previousElementSibling;
   if(secondLastChild == previousPagination){
      secondLastChild.remove();
   }

   // adding functionality to all the buttons when pressed
   paginationDiv.addEventListener('click', e => {
      if(e.target.tagName === 'A'){
         // check if the first button is selected or not, if not selected remove the active class
         if(e.target.textContent !== 1){
            const pagination = document.querySelectorAll('a')
            pagination[0].classList= '';
         }
         // displays the student based on page num
         showPage(students, e.target.textContent);
      }
   });

}

// creating search bars for students.
const pageHeader = document.querySelector('.page-header');
const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';
pageHeader.appendChild(searchDiv);
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search for students...'
searchDiv.appendChild(searchInput);
const searchButton = document.createElement('button');
searchButton.textContent = 'Search';
searchDiv.appendChild(searchButton);


// listing for key up in the input text and running the function
searchDiv.addEventListener('keyup', () => {
   search = searchInput.value;
   searchStudents(search, studentList);

});

// listing for key up in the input text and running the function
searchDiv.addEventListener('click', () => {
   search = searchInput.value;
   searchStudents(search, studentList);

});

// search for students function
searchStudents = (search, list) => {

   // calls searchError function if the input is empty
   if(search == ''){
      showPage(list, 1);
      appendPageLinks(list);
   }else{
      
      const errorDiv = document.querySelector('.error');
      // check if there is more than one errorDiv and if there is remove it from the page
      if(errorDiv !== null){
         errorDiv.remove();
      }
      let newStudentList = [];

      for( let i = 0; i < list.length; i++){ 
   
         const listName = list[i].querySelector('h3').textContent.toLowerCase();
   
         if(search.length != 0 && listName.includes(search.toLowerCase())){
            // assigns the student list value if the letter matches
           newStudentList.push(list[i]);
         }
      }
      // if there is no match then calls error function and resets the new student list back to total student list
      if(newStudentList.length == 0){
         searchError();
      }
      // displaying the page and the navigation
      showPage(newStudentList, 1);
      appendPageLinks(newStudentList);
   }
};

// if there is error in search, the following function is called
var searchError = () =>{

   // create a error div and appending it in the display
   const errorDiv = document.createElement('div');
   const errorP = document.createElement('p');
   const htmlPage = document.querySelector('.page');
   const studentList = document.querySelector('.student-list');
   errorDiv.appendChild(errorP);
   htmlPage.appendChild(errorDiv);
   errorDiv.className = 'error';
   errorP.innerHTML = 'There are no matches';
   errorP.style.color = 'red';
   errorP.style.padding = "1em 0";
   htmlPage.insertBefore(errorDiv,studentList);

   const firstChild = htmlPage.firstElementChild;
   const secondChild = firstChild.nextElementSibling;
   const thirdChild = secondChild.nextElementSibling;

   // checks if there is 2 error div to remove one 
   if(secondChild.textContent == thirdChild.textContent){
      thirdChild.remove();
   }
}
   
// calling the show page function in order to display the first list
showPage(studentList, 1);

// adding navigation buttons to the page
appendPageLinks(studentList);