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
   const navigationNum = Math.floor(listLength / page + 1);
   const li = [];
   const a = [];

   // generating buttons depending upon the size of list
   for( let i = 0; i < navigationNum; i++){      
      li[i] = document.createElement('li');
      a[i] = document.createElement('a');
      li[i].appendChild(a[i]);
      paginationUL.appendChild(li[i]);
      a[i].innerHTML = i + 1;
      a[i].href = '#';
      
      // assigning active class to the first link
      if(i === 0){
         a[i].classList.add('active');
      }
   }

   // adding functionality to all the buttons when pressed
   paginationDiv.addEventListener('click', e => {
      if(e.target.tagName == 'A'){
         
         const aNavigation = event.target;       
         const aText = aNavigation.textContent;

         // checking through all the a link and adding active class to the link being selected
         for(let i = 0; i < navigationNum; i++){

            if(a[i].textContent === aText){
               a[i].classList.add('active');
            }
            else{
               a[i].classList.remove('active');
            }

         }
         // calling the funcition depending upon the link pressed
         showPage(aText);
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



searchDiv.addEventListener('keyup', () => {

   search = searchInput.value;
   searchStudents(search, studentList);

});

searchStudents = (search, list) => {
   let newStudentList = [];

   for( let i = 0; i < list.length; i++){ 

      let listName = list[i].querySelector('h3').textContent.toLowerCase();

      if(search.length != 0 && listName.includes(search.toLowerCase())){
        newStudentList.push(list[i]);
      }
   }
   showPage(newStudentList, 1);
   appendPageLinks(newStudentList);
};
   
// calling the show page function in order to display the first list
showPage(studentList, 1);

// adding navigation buttons to the page
appendPageLinks(studentList);