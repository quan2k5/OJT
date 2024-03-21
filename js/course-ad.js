const form=document.querySelector('.course-form');
let listCourses=JSON.parse( localStorage.getItem("courses"))||[];
let nameCourse=form.querySelector(".name-Course");
let priceCourse=form.querySelector('.price-Course');
let imageCourse=form.querySelector('.image-Course');
let categoryCourse=form.querySelector('.select-input');
let describeCourse=form.querySelector('.describe-Course');
function categoryInCourses(){
    let listCategory=JSON.parse(localStorage.getItem("category"));
   const selectInput=document.querySelector('.select-input');
   listCategory.forEach(function(e){
    selectInput.innerHTML+=` 
        <option value="${e.name}" id="${e.id}">${e.name}</option>
    `
   });          
}
categoryInCourses();
function renderCategory() {
    document.querySelector('.table-courses .body-courses').innerHTML = '';
    listCourses.map(function (e) {
        document.querySelector('.table-courses .body-courses').innerHTML += `
        <tr class="category-item">
            <td class='category-id'>${e.id}</td>
            <td>${e.nameCourse}</td>
            <td><img src="${e.imageCourse}" alt=""></td>
            <td>${e.priceCourse}</td>
            <td>
                <p>${0} bài học ${0} chương</p>
                <a href=${"../pages/admin-content.html"}>Chỉnh sửa</a>
            </td>
            <td>
                <button class="watching-courses">Xem</button>
                <button class="edit-courses" id="${e.id}">Sửa</button>
                <button class="erase-category">Xóa</button>
            </td>
        </tr>  
        `
    });
}
renderCategory();
validation({
    form:form,
    rules:[
        required(nameCourse,'Tên khóa học đang trống'),
        checkNameCourse(nameCourse,"Tên khóa học bị trùng"),
        required(imageCourse,"Link ảnh đang trống"),
        checkLinkImage(imageCourse,"Link ảnh không hợp lệ"),
        required(priceCourse,"Gía tiền đang trống"),
        required(describeCourse,"Phần mô tả đang trống"),
        checkCategoryCoursesList(categoryCourse,"Danh mục đang trống"),
    ],
    success:succesed,
})
function succesed(){
  let input=form.querySelectorAll('input');
  let CourseItem=Array.from(input).reduce(function(store,current){
    store[current.name]=current.value;
    return store;
  },{});
  CourseItem.id=Math.floor(Math.random()*1000000),
  CourseItem.content='';
  let selectElement=form.querySelector('select');
  CourseItem[selectElement.name]=selectElement.value;
  listCourses.push(CourseItem);
  console.log(listCourses);
  localStorage.setItem("courses",JSON.stringify(listCourses));
}
